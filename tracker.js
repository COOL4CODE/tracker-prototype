// load our app server using express...

const express = require('express');
const app     = express();
const morgan  = require('morgan');
var cors      = require('cors');
var fs = require('fs');
var md5 = require('md5');
var bodyParser = require('body-parser');
const nem = require('nem-sdk/build/index.js').default;

// Prevent Cors-domain errors and allow it
app.use(cors());

// Logs customization
app.use(morgan('combined'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/assets", (req, res) => {

    fs.readFile("./datos.json", function (err,data)
    {
        if(err){console.log(err);
        }else{
              let rdata = JSON.parse(data.toString());
              let result = {...rdata, hash: md5(data)};
              res.end(JSON.stringify(result));
        }
    }
    );

})

app.post("/assets-transfer", (req, response) => {
  var hashMessage = req.body.hash;

  // Create an NIS endpoint object
  var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
  // console.log('Create an NIS endpoint object', endpoint);

  // Create a common object holding key 
  var common = nem.model.objects.create("common")("", "e82f40d22f81b8e6db10f2635b2bb4931c72eee4c68a762c043b6375768f20dc");
  // console.log('Create a common object holding key ', common);

  // Create variable to store our mosaic definitions, needed to calculate fees properly (already contains xem definition)
  var mosaicDefinitionMetaDataPair = nem.model.objects.get("mosaicDefinitionMetaDataPair");
  // console.log('Create variable to store our mosaic definitions, needed to calculate fees properly (already contains xem definition)', mosaicDefinitionMetaDataPair);

  // Create an un-prepared mosaic transfer transaction object (use same object as transfer tansaction)
  var transferTransaction = nem.model.objects.create("transferTransaction")("TBCI2A67UQZAKCR6NS4JWAEICEIGEIM72G3MVW5S", 1, hashMessage);
  // console.log('Create an un-prepared mosaic transfer transaction object (use same object as transfer tansaction)', transferTransaction);

  // Create a mosaic attachment object
  var mosaicAttachment = nem.model.objects.create("mosaicAttachment")("cool4code-test", "asset", 1);
  // console.log('Create a /mosaic attachment object', mosaicAttachment);

  // Push attachment into transaction mosaics
  transferTransaction.mosaics.push(mosaicAttachment);
  // console.log('Push attachment into transaction mosaics', mosaicAttachment);

  // Need mosaic definition of nw.fiat:eur to calculate adequate fees, so we get it from network.
  // Otherwise you can simply take the mosaic definition from api manually (http://bob.nem.ninja/docs/#retrieving-mosaic-definitions) 
  // and put it into mosaicDefinitionMetaDataPair model (objects.js) next to nem:xem (be careful to respect object structure)
  nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId).then(function(res) {
    // Look for the mosaic definition(s) we want in the request response (Could use ["eur", "usd"] to return eur and usd mosaicDefinitionMetaDataPairs)
    var neededDefinition = nem.utils.helpers.searchMosaicDefinitionArray(res.data, ["asset"]);
    
    // Get full name of mosaic to use as object key
    var fullMosaicName  = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId);

    // Check if the mosaic was found
    if (undefined === neededDefinition[fullMosaicName]) {
      console.error("Mosaic not found !");
      throw new Error();
    }

    // Set eur mosaic definition into mosaicDefinitionMetaDataPair
    mosaicDefinitionMetaDataPair[fullMosaicName] = {};
    mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition = neededDefinition[fullMosaicName];
    // console.log('Set eur mosaic definition into mosaicDefinitionMetaDataPair', neededDefinition[fullMosaicName]x);
    
    // ★Get current supply with nem:xem
    nem.com.requests.mosaic.supply(endpoint, nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId)).then(function(res) {
      mosaicDefinitionMetaDataPair[nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId)].supply = res.supply;
      
      // ★Get current supply with eur:usd
      nem.com.requests.mosaic.supply(endpoint, fullMosaicName).then(function(res) {
        mosaicDefinitionMetaDataPair[fullMosaicName].supply = res.supply;
      
        // Prepare the transfer transaction object
        var transactionEntity = nem.model.transactions.prepare("mosaicTransferTransaction")(common, transferTransaction, mosaicDefinitionMetaDataPair, nem.model.network.data.testnet.id);

        // Serialize transfer transaction and announce
        nem.model.transactions.send(common, transactionEntity, endpoint).then((rdata) => {
          response.send({ msg: 'Transacción enviada.', data: rdata });
        }).catch(err => {
          response.send({ msg: 'Error en la transacción.', err: err });
        });

      }, function(err) { console.error(err); }); 
    }, function(err) { console.error(err); });   
    

  }).catch(err => {
    response.send({ msg: 'Error en la transacción.', err: err });
  });     
})


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

var server = app.listen(3003, () => {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Server running at http://%s:%s', host, port);
    console.log('🖖 C4C');
})
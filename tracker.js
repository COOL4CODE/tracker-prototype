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

app.post("/assets-transfer", (req, res) => {
  // Create an NIS endpoint object
  var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
  console.log('Create an NIS endpoint object', endpoint);

  // Create a common object holding key 
  var common = nem.model.objects.create("common")("", "e82f40d22f81b8e6db10f2635b2bb4931c72eee4c68a762c043b6375768f20dc");
  console.log('Create a common object holding key ', common);

  // Create variable to store our mosaic definitions, needed to calculate fees properly (already contains xem definition)
  var mosaicDefinitionMetaDataPair = nem.model.objects.get("mosaicDefinitionMetaDataPair");
  console.log('Create variable to store our mosaic definitions, needed to calculate fees properly (already contains xem definition)', mosaicDefinitionMetaDataPair);

  // Create an un-prepared mosaic transfer transaction object (use same object as transfer tansaction)
  var transferTransaction = nem.model.objects.create("transferTransaction")("TBCI2A67UQZAKCR6NS4JWAEICEIGEIM72G3MVW5S", 1, req.body.hash);
  console.log('Create an un-prepared mosaic transfer transaction object (use same object as transfer tansaction)', transferTransaction);


  /**
   * ATTACHING XEM MOSAIC
   *
   * No need to get mosaic definition because it is already known in the mosaicdefinitionMetaDatapair
   */

  // Create a mosaic attachment object
  var mosaicAttachment = nem.model.objects.create("mosaicAttachment")("nem", "xem", 1);
  console.log('Create a mosaic attachment object', mosaicAttachment);

  // Push attachment into transaction mosaics
  transferTransaction.mosaics.push(mosaicAttachment);
  console.log('Push attachment into transaction mosaics', mosaicAttachment);

  // Prepare the transfer transaction object
  var transactionEntity = nem.model.transactions.prepare("mosaicTransferTransaction")(common, transferTransaction, mosaicDefinitionMetaDataPair, nem.model.network.data.testnet.id);
  console.log('Prepare the transfer transaction object', transactionEntity);

  // Serialize transfer transaction and announce
  console.log('Prepare the transfer transaction object');  
  nem.model.transactions.send(common, transactionEntity, endpoint).then((rdata) => {
    res.send({ msg: 'Transacción enviada.', data: rdata });
  }).catch(err => {
    res.send({ msg: 'Error en la transacción.', err: err });
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
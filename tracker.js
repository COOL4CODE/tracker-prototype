// load our app server using express...

const express = require('express');
const app     = express();
const morgan  = require('morgan');
var cors      = require('cors');
var fs = require('fs');

// Prevent Cors-domain errors and allow it
app.use(cors());

// Logs customization
app.use(morgan('combined'))

app.get( "/", (req, res) => {

    fs.readFile("./datos.json", function (err,data)
    {
        if(err){console.log(err);
        }else{
              console.log('Datos');
              res.end(data);
        }
    }
    );
})

app.get("/asset/:id", (req, res) => {

    
})

app.get("/person/:id", (req, res) => {
   
})

 app.get("/people", (req, res) =>{
 
 })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

var server = app.listen(3000, () => {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Server running at http://%s:%s', host, port);
    console.log('🖖 C4C');
})
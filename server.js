'use strict';

var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var hostString = process.argv[2]
var myJSON = require('./product-catalog.json');


var port = process.env.PORT || 8002
var app = express()


app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
	res.send('index.html')
})

/*
 * route /products has been replaced in this example with static JSON data
 */

app.get('/products', function(req, res) {

	console.log('/products api called')

    res.end(JSON.stringify(myJSON));
});

app.get('/searchProductNames', function(req, res) {

	console.log('/productNames api called')

  res.end(JSON.stringify(
    myJSON.Products
    .filter(product => product.PRODUCT_NAME.includes(req.query.term))
    .map(
      product => (({PRODUCT_NAME, PRODUCT_ID}) => ({PRODUCT_NAME, PRODUCT_ID}))(product)
    )));

});

app.get('/productNames', function(req, res) {

	console.log('/productNames api called');
  res.end(JSON.stringify(
    myJSON.Products.map(
      product => (({PRODUCT_NAME, PRODUCT_ID}) => ({PRODUCT_NAME, PRODUCT_ID}))(product)
    )));
});

app.get('/product/:id', function(req, res) {

	console.log('/product api called')
  res.end(JSON.stringify(
    myJSON.Products.filter(product => product.PRODUCT_ID == req.params.id)
  ));
});

app.listen(port, function() {
	console.log('AlphaOffice listening on port ' + port)

});

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var apiversion='/api/v1';


//MYSQL Connection
var db = require('./db.config');


var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Get all coffees
app.get(apiversion + '/coffees',  function (req, res)  {  

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  db.query('SELECT * FROM coffees', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'coffees list', data: results });
  });

  
});

app.post(apiversion + '/order',  function (req, res)  {  
  var orderId=req.body.orderId;
  var orderName=req.body.orderName;
  var orderAddress=req.body.orderAddress;
	var orderTotal = req.body.orderTotal;

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  
  db.query(`INSERT INTO orders 
    (orderId,orderName,orderAddress,orderTotal) 
    VALUES ( ${orderId},'${orderName}','${orderAddress}',${orderTotal});`,function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'Insert new order' });
  });


});


//Get coffee by id
app.get(apiversion + '/coffee/:coffeeId',  function (req, res)  {  


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var coffeeId = Number(req.params.coffeeId);
  
  db.query('SELECT * FROM coffees where coffeeId=?', coffeeId.toString(),function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'coffee Id =' + coffeeId.toString(), data: results });
  });


});


//Delete coffee by id
app.delete(apiversion + '/coffee/:coffeeId',  function (req, res)  {  

  //Code for Delete
  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var coffeeId = Number(req.params.coffeeId);
  
  db.query('Delete FROM coffees where coffeeId=?', coffeeId.toString(),function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'Delele coffee Id =' + coffeeId.toString() });
  });

});


//Add new coffee
app.post(apiversion + '/coffee',  function (req, res)  {  


  var coffeeName = req.body.coffeeName; 	
  var coffeePrice=req.body.coffeePrice;
	var coffeeDescription=req.body.coffeeDescription;
	var coffeePicture=req.body.coffeePicture;

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var coffeeId = Number(req.params.coffeeId);
  
  db.query(`INSERT INTO coffees 
    (coffeeName,coffeePrice, coffeeDescription, coffeePicture) 
    VALUES ( '${coffeeName}',${coffeePrice}, '${coffeeDescription}','${coffeePicture}');`,function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'Insert new coffee' });
  });


});



//Edit coffee by id
app.put(apiversion + '/coffee/:coffeeId',  function (req, res)  {  


  //Code for Edit
 
  var coffeeName = req.body.coffeeName; 	
  var coffeePrice=req.body.coffeePrice;
	var coffeeDescription=req.body.coffeeDescription;
	var coffeePicture=req.body.coffeePicture;


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var coffeeId = Number(req.params.coffeeId);
  
  db.query(`
  UPDATE coffees 
  SET 
    coffeeName='${coffeeName}',
    coffeePrice=${coffeePrice},
    coffeeDescription='${coffeeDescription}',
    coffeePicture='${coffeePicture}'
  
  WHERE coffeeId=${coffeeId}`, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'Update new coffee' });
  });
  app.post(apiversion + '/coffee',  function (req, res)  {  


    var coffeeName = req.body.coffeeName; 	
    var coffeePrice=req.body.coffeePrice;
    var coffeeDescription=req.body.coffeeDescription;
    var coffeePicture=req.body.coffeePicture;


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var coffeeId = Number(req.params.coffeeId);
  
  db.query(`INSERT INTO coffees 
    (coffeeName,coffeePrice, coffeeDescription, coffeePicture) 
    VALUES ( '${coffeeName}',${coffeePrice}, '${coffeeDescription}', '${coffeePicture}');`,function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'Insert new coffee' });
  });


});




});



app.listen(port, function () {
    console.log("Server is up and running...");
});

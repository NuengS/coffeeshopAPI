var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var fileUpload = require('express-fileupload');

var apiversion='/api/v1';

const dotenv = require('dotenv');
dotenv.config();

const bookpicturepath=process.env.COFFEE_PICTURE_PATH;
const secretkey=process.env.SECRET


//MYSQL Connection
var db = require('./db.config');






var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());



//Get all coffees
app.get(apiversion + '/coffees',  function (req, res)  {  
  
    try
    {
        
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        db.query('SELECT * FROM coffees', function (error, results, fields) {
            if (error) throw error;
            return res.status(200).send({ error: false, message: 'coffees list', data: results });
        });
			
		} catch {

      return res.status(401).send()

    }




  
});



//Get coffee by id
app.get(apiversion + '/coffee/:coffeeId',  function (req, res)  {  

  try
  {


      res.setHeader('Content-Type', 'application/json');
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      var coffeeId = Number(req.params.coffeeId);
      
      db.query('SELECT * FROM coffees where coffeeId=?', coffeeId.toString(),function (error, results, fields) {
          if (error) throw error;
          return res.send({ error: false, message: 'coffee Id =' + coffeeId.toString(), data: results });
      });

    } catch {

      return res.status(401).send()

    }

});



//Get all orders
app.get(apiversion + '/orders',  function (req, res)  {  
  
  try
  {
      
      res.setHeader('Content-Type', 'application/json');
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      
      db.query('SELECT * FROM orders', function (error, results, fields) {
          if (error) throw error;
          return res.status(200).send({ error: false, message: 'orders list', data: results });
      });
    
  } catch {

    return res.status(401).send()

  }





});


//Add new order
app.post(apiversion + '/order', function  (req, res) {  

  try
  {

    var orderId =req.body.orderId;
    var orderName = req.body.orderName; 	
    var orderAddress=req.body.orderAddress;
    var orderTotal =req.body.orderTotal;

    //code for get mapDetails
    var mapDetails=JSON.parse(details)

    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    
    db.query(`INSERT INTO orders 
      (orderId,orderName,orderAddress,orderTotal) 
      VALUES ( ${orderId},'${orderName}', '${orderAddress}', ${orderTotal});`,  function (error, results, fields) {

        if (error) throw error;
        
        db.query('SELECT orderId as orderId FROM orders ORDER BY orderId DESC LIMIT 1', function (error, results, fields){
        if(error) throw error;

        var orderId = Number(JSON.parse(JSON.stringify(results))[0]["orderId"]);

        mapDetails.forEach(item => {
                
          db.query(`
            INSERT INTO orderdetail (orderId, coffeeId, sweetLevel, price ,qty)  
            VALUES(${orderId},${item.coffeeId}, ${item.sweetLevel}, ${item.price}, ${item.qty});`,
            function (error, results, fields) {
                if (error) throw error;
            });
        });
      });
       //get last order id
       //insert order detail

        return res.send({ error: false, message: 'Add new order' });

    });
  
  } catch(e) {
    console.log(e);
    //return res.status(401).send({ error: true, message: err.toString() });

    return res.status(401).send()

  }

});







app.listen(port, function () {
    console.log("Server is up and running...");
});

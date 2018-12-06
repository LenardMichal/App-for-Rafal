var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const pl = require('../pl');
const locale = pl;

const fs = require('fs');

const path = require('path')
const nodemailer = require('nodemailer');

const sec = require('../security');

//Mongo setup
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://${sec.db.user}:${sec.db.pass}@${sec.db.adress}${sec.db.dbName}`;
const ObjectId = require('mongodb').ObjectID










/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      article1: locale.article1,
      article2: locale.article2,
      menu: locale.menu
  });
});


router.get('/oferta', (req, res)=>{
 
  
  res.render('oferta', {
    oferta: locale.oferta,
    menu: locale.menu
    
  });

});

router.get('/dostawy', (req, res)=>{
  res.render('zasieg', {
      menu: locale.menu
  });
})

router.get('/zasieg', (req, res)=>{
  res.sendFile(path.join(__dirname, './public', 'dostawy.html' ))
});

router.get('/kontakt', (req, res)=>{
  res.render('kontakt', {
    menu: locale.menu
  });
});






router.get('/dziekuje', (req, res)=>{
  res.render('dziekuje',{
    menu: locale.menu
  })
});


   
    




router.post('/notify',  (req, res)=>{
   
  MongoClient.connect(url,{ useNewUrlParser: true }, (err, db)=>{
    if (err) throw err;
    let dbo = db.db(sec.dbName);
    let query = { 
        "_id": ObjectId(req.body.order.extOrderId)
    };
    let update = {$set: {payed: String(req.body.order.status)}}
    dbo.collection('customers').updateOne(query, update, (err, res)=>{
      if (err) throw err;
      console.log('updated');
      db.close()
    })

    })
  })

  

  



module.exports = router;

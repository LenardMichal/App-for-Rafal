var router = require('express').Router();
const pl = require('../pl');
const locale = pl;
const bodyparser = require('body-parser');
const sec = require('../security');
const nodemailer = require('nodemailer');
//Mongo setup
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://${sec.db.user}:${sec.db.pass}@${sec.db.adress}${sec.db.dbName}`;
const ObjectId = require('mongodb').ObjectID

const danger = {
  token: ''
}

router.get('/admin', (req, res)=>{
  res.render('verify', {
    menu: locale.menu
  });
});

//Password verification 
router.post('/admin', (req, res)=>{
    console.log(req.ip);
    if (req.body.pass === sec.adminPass){
    let transporter = nodemailer.createTransport({
      host: 'poczta.interia.pl',
      port: 465,
      secure: true,
      auth: {
          user: 'lenekm@interia.pl',
          pass: 'woki01'
      },
      tls: {
          rejectUnauthorized: false
      }
  });
  danger.token = String(Math.floor((Math.random()*10000000)));

  let message = {
    from: 'lenekm@interia.pl',
    to: sec.tokenMail,
    subject: 'Token Logowania',
    text: `Token to: ${danger.token}` 
    };
    transporter.sendMail(message, (err, info)=>{
      if (err) console.log(err);
      console.log(danger.token)
    })


    res.render('secondverify', {
      menu: locale.menu
    })
    
    //
  
  }else{
    res.render('verify',{
      menu: locale.menu
    });
  }
});


router.post('/token', (req, res)=>{
  if(req.body.token === danger.token){
  MongoClient.connect(url,{ useNewUrlParser: true }, (err, db)=>{  
    if (err) throw err;
    
    let dbo = db.db(); 
    
    dbo.collection('customers').find({}).toArray((err, result)=>{
      if (err) throw err;        
      let filter = `${new Date().getDate() + 1}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
      let arr = result.filter((pos)=>{
        return pos.creationDate == filter
      }) 
      
      
      res.render('admin', {
        db: result,
        form: locale.form,
        menu: locale.menu,
        arr: arr  
        });
        db.close();  
    });
  });
  }else{
    res.send('zly token');
  }
});



    
  

module.exports = router
var router = require('express').Router();
const pl = require('../pl');
const locale = pl;
const axios = require('axios');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const sec = require('../security.js')
//Mongo setup
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://${sec.db.user}:${sec.db.pass}@${sec.db.adress}${sec.db.dbName}`;
const ObjectId = require('mongodb').ObjectID
const validation = require('../validator.js')



router.get('/zamow', (req, res) => {
  res.render('zamow', {
    menu: locale.menu,
    oferta: locale.oferta,
    form: locale.form,
    cal: locale.cal,
    calCost: locale.calCost,
    err: '',
    cityList: locale.cityList,
    calVal: locale.calValue
  })
});





router.post('/zamow', (req, res) => {


  let client = {
    personals: {
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      email: req.body.email
    },
    type: {
      diet: req.body.diet,
      cal: req.body.calories,
      dateRange: req.body.dates,
      countDiets: req.body.countDiets,
      countDays: req.body.dates.split(',').length

    },
    delivery: {
      city: req.body.city,
      postal: req.body.postal,
      street: req.body.street,
      buildNumber: req.body.buildNumber,
      coop: req.body.coop,
      local: req.body.local,
      floor: req.body.floor,
      intercom: req.body.intercom,
      note: req.body.note
    }
  }


  if (req.body.INV) {
    client.invoice = {
      company: req.body.INV_company,
      NIP: req.body.INV_NIP,
      street: req.body.INV_street,
      buildNumber: req.body.INV_buildNumber,
      city: req.body.INV_city,
      postal: req.body.INV_postal
    }
  } else {
    client.invoice = false
  }

  

  if (validation.validator(client).error > 0) {

    res.render('zamow', {
      menu: locale.menu,
      oferta: locale.oferta,
      form: locale.form,
      cal: locale.cal,
      calCost: locale.calCost,
      err: validation.validator(client),
      cityList: locale.cityList,
      calVal: locale.calValue
    })
  } else {





    insertRecord(client.personals, client.type, client.delivery, client.invoice);



    function insertRecord(personals, type, delivery, invoice) {
      let creationDate = new Date();
      let puttyDate = `${creationDate.getDate()}-${creationDate.getMonth()+1}-${creationDate.getFullYear()}`
      let puttyHour = `${creationDate.getHours()}:${(creationDate.getMinutes()<10?'0':'') + creationDate.getMinutes()}`;

      MongoClient.connect(url, {
        useNewUrlParser: true
      }, (err, db) => {
        if (err) throw err;
        let dbo = db.db(sec.dbName);
        let record = {
          personals,
          type,
          delivery,
          invoice,
          "creationDate": puttyDate,
          "creationHour": puttyHour,
          "payed": false
        };
        dbo.collection('customers').insertOne(record, (err, res) => {
          if (err) throw err;
          console.log('1 document inserted');
          db.close();
          sendNudes();


        })
      });
    }

    function sendNudes() {
      MongoClient.connect(url, {
        useNewUrlParser: true
      }, (err, db) => {
        if (err) throw err;
        let dbo = db.db(sec.dbName);
        let query = {
          "personals.phone": client.personals.phone,
          "personals.name": client.personals.name,
          "personals.surname": client.personals.surname,
          "personals.email": client.personals.email
        }
        dbo.collection('customers').find(query).toArray((err, result) => {
          if (err) throw err;

          let dietCost
          switch (result[result.length - 1].type.diet) {
            case locale.oferta[0].class:
              dietCost = locale.oferta[0].price;
              break;
            case locale.oferta[1].class:
              dietCost = locale.oferta[1].price;
              break;
            case locale.oferta[2].class:
              dietCost = locale.oferta[2].price;
              break;
            case locale.oferta[3].class:
              dietCost = locale.oferta[3].price;
              break;
            default:
              break;
          }
          let calCost;
          switch (result[result.length - 1].type.cal) {
            case locale.calValue[0]:
              calCost = locale.calCost[0];
              break;
            case locale.calValue[1]:
              calCost = locale.calCost[1];
              break;
            case locale.calValue[2]:
              calCost = locale.calCost[2];
              break;
            case locale.calValue[3]:
              calCost = locale.calCost[3];
              break;
            default:
              break;
          }

          //            
          let totalCost = dietCost * calCost * result[result.length - 1].type.dateRange.length * Number(result[result.length - 1].type.countDiets);
          let unitCost = dietCost * calCost * result[result.length - 1].type.dateRange.length;



          axios({
            method: 'post',
            url: sec.shop.authUrl,
            data: `grant_type=client_credentials&client_id=${sec.shop.clientID}&client_secret=${sec.shop.clientSecret}`,
            timeout: 10000,

          }).then((response) => {

            axios({
              method: 'post',
              url: sec.shop.shopUrl,
              headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${response.data.access_token}`
              },
              data: `{
                   "notifyUrl":"http://lenek93.usermd.net/notify",
                   "customerIp": ${req.ip},
                   "merchantPosId": ${sec.shop.clientID},
                   "description": "dietShop",
                   "currencyCode": "PLN",
                   "totalAmount": "${totalCost}",
                   "extOrderId": "${result[result.length-1]._id}",
                   "continueUrl": "http://lenek93.usermd.net/dziekuje",
             
                   "products": [
                     {
                       "name": "Dieta",
                       "unitPrice": "${unitCost}",
                       "quantity": ${result[result.length-1].type.countDiets}
                     }
                   ]
                 }`

            }).then((response1) => {

              //  sendMail(client); 
              res.redirect(response1.request.res.responseUrl);
            }).catch((err) => {
              console.log('request failed')

            });

          }).catch((err) => {
            console.log('auth failed');

          })


          db.close();
        });
      });
    }


  }
});



function sendMail(obj) {
  let transporter = nodemailer.createTransport({
    host: sec.mailInfo.host,
    port: 465,
    secure: true,
    auth: {
      user: sec.mailInfo.user,
      pass: sec.mailInfo.pass
    }
  });



  ejs.renderFile(__dirname + "/mails/mail.ejs", {
    name: obj.name,
    surname: obj.surname,

  }, (err, data) => {
    if (err) console.log(err)
    var message = {
      from: sec.mailInfo.adress,
      to: obj.email,
      subject: sec.mailInfo.subject,
      html: data
    }
    transporter.sendMail(message, (err, info) => {
      if (err) console.log(err)
      console.log(info)
    })
  });
}


module.exports = router;
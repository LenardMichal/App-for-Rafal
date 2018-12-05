'use strict';
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var router = require('express').Router();
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const axios = require('axios');



router.get('/sendmail', (req, res)=>{
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }
    
        console.log('Credentials obtained, sending message...');
    
        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        ejs.renderFile(path.join(__dirname + '/mails' + '/mail.ejs'), {name: 'Lenu'}, (err, data)=>{
            // Message object
        console.log(err);
        let message = {
            from: 'Sender Name <sender@example.com>',
            to: 'Recipient <recipient@example.com>',
            subject: 'Nodemailer is unicode friendly ✔',
            text: 'Hello to myself!',
            html: data
        };
    
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
    
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.redirect(nodemailer.getTestMessageUrl(info))
        });
     });
    
    }); //End of create acc
    
    
});




module.exports = router

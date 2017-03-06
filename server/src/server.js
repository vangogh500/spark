var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var credentials = require('./credentials.js')

var nodemailer = require('nodemailer')
var smtpTransport = require("nodemailer-smtp-transport")
var transporter = nodemailer.createTransport(smtpTransport({
    host : credentials.email.host,
    secureConnection : true,
    port: 587,
    auth : {
      user : credentials.email.auth.user,
      pass : credentials.email.auth.pass
    }
}));

mongoose.connect(credentials.mongodb.url)


var facebook = require('./util/facebook.js')

app.use(bodyParser.json())
require('./routes.js')(app, transporter)


app.listen(3000, function() {
  console.log("server is running on port 3000")
})

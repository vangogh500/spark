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
    auth : credentials.email.auth
}));

mongoose.connect(credentials.mongodb.url)

app.use(bodyParser.json())
require('./routes.js')(app)


app.listen(3000, function() {
  console.log("server is running on port 3000")
})

var express = require('express')
var app = express()
var mongoose = require('mongoose')

mongoose.connect('mongodb://kmatsuda:namumyo@ds157529.mlab.com:57529/kai_test')

var User = require('./models/user.js')

var test = new User({
  profile: {
    firstName: "Kevin",
    lastName: "Doan"
  }
})

test.save(function(err) {
  if(!err) console.log("success")
})

app.listen(3000, function() {
  console.log("server is running on port 3000")
})

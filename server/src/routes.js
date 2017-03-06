var bcrypt = require('bcrypt')

var EmailVerificationToken = require('./models/emailVerificationToken.js')
var Facebook = require('./util/facebook.js')

module.exports = function(app, transporter) {
  app.get('/', function(req,res) {
    res.send()
  })
  app.post('/auth/facebook', function(req,res) {
    Facebook.verifyClientToken(req.body.access_token, function(valid, user) {
      if(valid) {
        if(user) {
          res.send("test")
        }
        else {
          res.status(404).send({ status: 404, msg: "No user found. Please redirect to '/register/facebook' "})
        }
      }
      else {
        res.status(401).send({ status: 401, msg: "Invalid facebook token." })
      }
    })
  })
  app.post('/register/facebook', function(req,res) {
    Facebook.createAccount(req.body.access_token, function(user) {
      res.send(user)
    })
  })
}

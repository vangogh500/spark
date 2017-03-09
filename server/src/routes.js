var bcrypt = require('bcrypt')

var EmailVerificationToken = require('./models/emailVerificationToken.js')
var Facebook = require('./util/facebook.js')
var jwt = require('jsonwebtoken');
var credentials = require('./credentials.js')

module.exports = function(app, transporter) {
  app.get('/', function(req,res) {
    res.send()
  })
  app.post('/auth/facebook', function(req,res) {
    console.log("auth facebook")
    Facebook.verifyClientToken(req.body.access_token, function(valid, user) {
      if(valid) {
        if(user) {
          jwt.sign({ id: user._id }, credentials.jwt.secret, { expiresIn: '7 days' }, function(err, token) {
            if(err) {
              res.status(500).send({ status: 500, msg: "code: 101"})
            }
            res.send({ user: user, token: token })
          })
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
    console.log("register facebook")
    Facebook.createAccount(req.body.access_token, function(user) {
      if(user) {
        jwt.sign({ id: user._id }, credentials.jwt.secret, { expiresIn: '7 days' }, function(err, token) {
          if(err) {
            res.status(500).send({ status: 500, msg: "code: 101"})
          }
          console.log({ user: user, token: token });
          res.send({ user: user, token: token })
        })
      }
      else {
        res.status(500).send({ status: 500, msg: "code 102"})
      }
    })
  })
}

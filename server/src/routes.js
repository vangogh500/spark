var bcrypt = require('bcrypt')

var EmailVerificationToken = require('./models/emailVerificationToken.js')
var Facebook = require('./util/facebook.js')
var jwt = require('jsonwebtoken');
var credentials = require('./credentials.js')
var util = require('./util/util.js')
var User = require('./models/user.js')

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
            //jwt failed
            res.status(500).send({ status: 500, code: 101})
          }
          res.send({ user: user, token: token })
        })
      }
      else {
        //user creation failed
        res.status(500).send({ status: 500, code: 102 })
      }
    })
  })
  app.post('/profile', function(req, res) {
    console.log("updating profile")
    jwt.verify(req.headers.authorization, credentials.jwt.secret, function(err, data) {
      if(err) {
        //invalid token
        res.status(401).send({ status: 401, msg: 101 })
      }
      else {
        User.findOne({ _id: data.id }, function(err, found) {
          if(err) {
            //db error
            res.status(500).send({ status: 505, code: 103 })
          }
          else if(found) {
            var update = req.body
            var updateBirthday = new Date(req.body.birthday)

            var updateBirthdayString
            if(isNaN(updateBirthday))
              updateBirthdayString = null
            else
              updateBirthdayString = updateBirthday.toString()

            var toUpdate = {
              name: {
                first: update.name.first,
                last: update.name.last
              },
              location: {
                city: update.location.city,
                country: update.location.country
              },
              birthday: updateBirthdayString,
              gender: update.gender,
              languages: update.languages,
              relationship_status: update.relationship_status,
              interested_in: update.interested_in,
              religion: update.religion,
              political_views: update.political_views,
              ethnicity: update.ethnicity,
              nationality: update.nationality,
              bio: update.bio,
              interests: update.interests
            }
            found.profile = toUpdate
            found.save(function(err) {
              if(err) {
                // error saving
                console.log(err)
                res.status(500).send({ status: 500, code: 104 })
              }
              else {
                console.log(found)
                res.send(found)
              }
            })

          }
          else {
            //user not found
            res.status(404).send({ status: 404, code: 101 })
          }
        })
      }
    })
  })
}

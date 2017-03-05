var bcrypt = require('bcrypt')

var EmailVerificationToken = require('./models/emailVerificationToken.js')

module.exports = function(app, transporter) {
  app.get('/', function(req,res) {
    console.log("tesssst")
    res.send()
  })
  app.post('/login', function(req,res) {
    console.log(req.body)
    res.send({ test: "test" })
  })
}

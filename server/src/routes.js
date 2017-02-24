var bcrypt = require('bcrypt')

module.exports = function(app, transporter) {
  app.post('/emailVerification', function(req,res) {
    console.log("Processing email verification...")
    var user = req.body
    user.email = user.email.trim().toLowerCase()

    //TODO: Check if user with email exists
    bcrypt.hash(user.password, 10, function(e, hash) {
      console.log("\t Hashing...")
      if(e) {
        console.log("\t ERROR: hashing user password")
      }
      else {
        console.log("\t Success! Creating new token...")
        var EmailVerificationToken = require('./models/emailVerificationToken.js')
        var emailVerificationToken = new EmailVerificationToken({email: user.email, password: hash});
        emailVerificationToken.createVerificationToken(function (err, token) {
          if(err) {
            console.log("\t ERROR: creating token")
          }
          else {
            var link = req.protocol + "://" + req.get('host') + "/verifyEmail/" + token;
            console.log("\t Success! Sending verification to email...")
            var mailOptions = {
              from: "UniLoL <uniloltemp@gmail.com>", // sender address
              to: user.email, // list of receivers
              subject: "Verification Link", // Subject line
              text: "Test", // plaintext body
              html: '<div style="background: #212121; color: #FFF; padding: 5px;"><h3>UniLol</h3></div><p>Thank you for registering with us. Follow the link below to get one step closer to participating in your campus community:</p><a href=\"' + link + '\" >' + link + '</a>' // html body
            };
            transporter.sendMail(mailOptions, function(err) {
              if(err) {
                console.log("\t ERROR: sending verification email")
                console.log(err)
              }
              else {
                console.log("\t Success!")
                res.send(token)
              }
            })
          }
        })
      }
    })
  })
}

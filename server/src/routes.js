module.exports = function(app) {
  app.post('/emailVerification', function(req,res) {
    var user = req.body
    user.email = user.email.trim().toLowerCase()
    res.send("test")
  })
}

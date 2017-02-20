var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
  profile: {
    firstName: String,
    lastName: String,
    location: {
      city: String,
      district: String
    }
  }
})

module.exports = mongoose.model('User', UserSchema)

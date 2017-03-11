var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
  facebookId: { type: String, unique: true },
  profile: {
    name: {
      first: String,
      last: String
    },
    location: {
      city: String,
      country: String
    },
    birthday: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'transgender', 'agender', '']},
    languages: [String],
    relationship_status: { type: String, enum: ['single', 'in a relationship', 'engaged', 'married', ''] },
    interested_in: {type: String, enum: ['men', 'women', 'men and women', '']},
    religion: String,
    political_views: String,
    ethnicity: String,
    nationality: String,
    bio: String,
    interests: [String]
  },
  album: {
    primary: String,
    secondary: String,
    ternary: String
  }
})

UserSchema.path('profile.bio').validate(function(str) {
  return str.length < 600;
})
UserSchema.path('profile.name.first').validate(function(str) {
  return str.length < 10;
})
UserSchema.path('profile.name.last').validate(function(str) {
  return str.length < 10;
})

module.exports = mongoose.model('User', UserSchema)

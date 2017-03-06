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
    gender: { type: String, enum: ['male', 'female', 'transgender', 'agender']},
    languages: [String],
    relationship_status: { type: String, enum: ['single', 'in a relationship', 'engaged', 'married'] },
    interested_in: [ {type: String, enum: ['male', 'female', 'transgender', 'agender']} ],
    religion: String,
    political_views: String,
    ethnicity: String,
    nationality: String
  },
  album: {
    primary: String,
    secondary: String,
    ternary: String
  }
})

module.exports = mongoose.model('User', UserSchema)

const {Schema, model} = require('mongoose')
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sumonerId: {
    type: String,
    required: true
  },
  accountId: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  bio: String,
  status: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: false
  },
  rank: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('User', UserSchema)

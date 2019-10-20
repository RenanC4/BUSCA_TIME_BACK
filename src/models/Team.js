const {Schema, model} = require('mongoose')

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: {
    type: Array,
    required: true
  },
  bio: String
}, {
  timestamps: true
})

module.exports = model('Team', TeamSchema)

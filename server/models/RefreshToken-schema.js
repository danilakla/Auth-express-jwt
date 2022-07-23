const mongoose = require('mongoose');

TokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  refreshToken: {
    type: String,
    required: true
  }
})

module.exports = model('Token', TokenSchema)
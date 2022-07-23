const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,

  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  activationLink: {
    type: String,
    unique: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
})

UserSchema.pre("save", function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = bcrypt.hash(this.password, 4);
  this.activationLink = uuid.v4();
  next();
})



module.exports = model('User', UserSchema)
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
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
})

UserSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    console.log('s1');
    next();
    console.log('s2');

  } else {

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
    this.activationLink = uuid.v4();
    next();
  }


})



module.exports = model('User', UserSchema)
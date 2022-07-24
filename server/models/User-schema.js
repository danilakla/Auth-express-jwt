const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const crypto = require('crypto');
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
    next();

  } else {


    this.password = await bcrypt.hash(this.password, 4);
    this.activationLink = uuid.v4();
    next();
  }


})
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getResetTokenPassword = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.resetPasswordExpires = Date.now() + 10 * (60 * 1000);
  return resetToken;

}
module.exports = model('User', UserSchema)
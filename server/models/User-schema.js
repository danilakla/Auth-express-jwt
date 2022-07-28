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

  roles: [
    {
      type: String,
      ref: 'Role',
    }
  ],
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
  try {
    const info = await bcrypt.compare(password, this.password);
    return info

  } catch (error) {
    console.log(error);
  }
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
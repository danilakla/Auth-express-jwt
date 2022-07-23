const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Model({
  email: {
    type: String,
    required: [true, 'Please enter a valid email address'],
    unique: true,
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",]
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 4,
    select: false,
    maxlength: 10,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
})

UserSchema.pre("save", function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 4);

})



module.exports = mongoose.model('User', UserSchema)
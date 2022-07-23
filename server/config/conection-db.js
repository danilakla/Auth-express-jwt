const mongoose = require('mongoose');

const connectDB = async () => {

  await mongoose.connect(process.env.DATABASE_CONTECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("Mongoose Connected to database");
}
module.exports = connectDB;
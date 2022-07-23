require('dotenv').config()
const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/conection-db');
const error = require('./middleware/error-middleware');
const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({
  credentials: true,
  origin: 'https://localhost:3000',
  optionsSuccessStatus:
    { code: 200, message: 'success' },
}))
app.use(error)

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => console.log('Server listening on port ' + process.env.PORT))
}


startServer()
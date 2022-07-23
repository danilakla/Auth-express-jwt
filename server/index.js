require('dotenv').config()
const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({
  credentials: true,
  origin: 'https://localhost:3000',
  optionsSuccessStatus:
    { code: 200, message: 'success' },
}))


const startServer = async () => {

  app.listen(process.env.PORT, () => console.log('Server listening on port ' + process.env.PORT))
}


startServer()

require('dotenv').config()
const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/conection-db');
const errorMiddleware = require('./middleware/error-middleware');
const app = express();
const routerAuth = require('./routes/authentication-router');
const routerActivate = require('./routes/activate-router');
const routerAuthorized = require('./routes/authorized-router');
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200, //!!!

}))
app.use((req, res, next) => {
  console.log(312321123);
  next();
})

app.use('/api', routerAuth);
app.use('/api', routerActivate)
app.use('/api', routerAuthorized)

app.use(errorMiddleware)

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => console.log('Server listening on port ' + process.env.PORT))
}


startServer()
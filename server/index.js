
require('dotenv').config()
const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/conection-db');
const app = express();


const errorMiddleware = require('./middleware/error-middleware');


const routerAuth = require('./routes/authentication-router');
const routerActivate = require('./routes/activate-router');
const routerAuthorized = require('./routes/authorized-router');
const routerPayment = require('./routes/payment')
const routerUser = require('./routes/user-router')

app.use(express.json());
app.use(cookieparser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200, //!!!

}))



app.use('/api', routerAuth);
app.use('/api', routerActivate)
app.use('/api', routerAuthorized)
app.use('/api', routerPayment)
app.use('/api', routerUser)

app.use(errorMiddleware)

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => console.log('Server listening on port ' + process.env.PORT))
}


startServer()
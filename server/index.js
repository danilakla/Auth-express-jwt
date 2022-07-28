
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
const midl = require('./middleware/auth-middleware')
const roleMidl = require('./middleware/role-auth-middleware')

const UserModel = require('./models/User-schema')
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200, //!!!

}))

app.get('/api/one', midl, async (req, res, next) => {
  const users = await UserModel.findOne({ _id: req.user.id })
  res.json(users);
  next();
})


app.get('/api/all', roleMidl(['Admin']), async (req, res, next) => {
  const users = await UserModel.find();
  res.json(users);
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
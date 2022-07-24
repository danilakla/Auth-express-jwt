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
const authMiddleware = require('./middleware/auth-middleware');
const tokenModel = require('./models/RefreshToken-schema');
const roleModel = require('./models/Role')
const authRoleMiddleware = require('./middleware/role-auth-middleware')
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  credentials: true,
  origin: 'https://localhost:3000',
  optionsSuccessStatus:
    { code: 200, message: 'success' },
}))

app.use('/api', routerAuth);
app.use('/api', routerActivate)
app.use('/api', routerAuthorized)

app.use(errorMiddleware)

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => console.log('Server listening on port ' + process.env.PORT))
}


startServer()
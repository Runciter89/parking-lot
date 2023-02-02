require('dotenv').config(); // import and configure dotenv as early as possible !!!

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const routes = require('./routes');


const app = express();

//Middlewares
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ maxAge: 604800000 }));
app.use(helmet());

//mounting router
app.use('/parking', routes);

//Settings
app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), () => {
  console.log("Start server on port " + app.get('port'))
})


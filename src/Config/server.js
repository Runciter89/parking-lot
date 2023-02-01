const express = require('express');
const app = express();

const routes = require('../routes');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());

app.use('/', routes);
  
  app.listen(app.get('port'),()=>{
    console.log("Start server on port "+app.get('port'))
  })

  
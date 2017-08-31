const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
//mongoose promise is deprecated so need to set to global promise.
mongoose.Promise = global.Promise;

//gives static html to user, no reason to continue further middleware commands
app.use(express.static('public'));

//middleware
//must before our route init
app.use(bodyParser.json());


//uses routes from api.js file
// '/api' puts that in the url before any of the routes
app.use('/api',routes);

//error handling middleware
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message})
});

//listen for requests
app.listen(process.env.port || 4000, function () {
  console.log('now listening for requests');
});

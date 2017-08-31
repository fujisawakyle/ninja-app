const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja')

// get a list of ninjas from the db
router.get('/ninjas', function(req, res, next) {
  //this will find all ninjas
  /*Ninja.find({}).then(function(ninjas){
    res.send(ninjas)
  }); */
  Ninja.geoNear(
    {type: 'Point', coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    {maxDistance: 100000, spherical:true}
  ).then(function(ninjas){
    res.send(ninjas);
  });
});

// add a new ninja to the db
router.post('/ninjas', function(req, res, next) {
  //creates a new instance and saves it
  Ninja.create(req.body).then(function(ninja){
    //good practice to send back the data
    res.send(ninja);
  }).catch(next);

});

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next) {
  Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    //this above line updates the body, but you have to call it again to find updated version of ninja instance.
    Ninja.findOne({_id: req.params.id}).then(function(ninja){
      res.send(ninja);
    });
  });
});

// delete a ninja in the db
router.delete('/ninjas/:id', function(req, res, next) {
  //mongoose delete method
  Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
    res.send(ninja);
  });
});

module.exports = router;

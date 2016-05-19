var express = require('express');
var geonames = require('../lib/geonames');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/countries', function(req, res, next){
  geonames.countries().then(function(httpres){
    res.send(httpres);
  }, function(error){
    next(error);
  });
});

module.exports = router;

var express = require('express');
var geonames = require('../lib/geonames');
var countrygraphs = require('../lib/countrygraphs');
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

router.get('/sorted', function(req, res, next){
  geonames.countries().then(function(apiresult){
    console.log("result");
    console.log(apiresult);
    var countries = apiresult.geonames;
    var nlIndex = countrygraphs.getCountryCodeIndex("NL", countries);
    var compareFunction = countrygraphs.getCountryCompareFunction(nlIndex, countries);
    countries.sort(compareFunction);
    console.log(countries);
    var nameList = countrygraphs.getNameDistanceList(nlIndex,countries);
    console.log(nameList);
    console.log(nameList.length);
    res.send(nameList);
  }, function(error){
    next(error);
  });
});

module.exports = router;

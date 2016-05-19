var http = require('http');
module.exports = {
  countries: function(){
    return new Promise(function(resolve, reject){
      http.get('http://api.geonames.org/countryInfoJSON?username=' + process.env.geonames_api_username, function(res){
        if(res.statusCode == 200){
          var responseBody = "";
          res.on('data', function(d){
            responseBody += d;
          });
          res.on('end', function(){
            var parsedBody = JSON.parse(responseBody);
            resolve(parsedBody);
          });
        }else{
          reject(Error(res.statusCode));
        }
      }).on('error', function(e) {
        reject(Error(e.message));
      });
    });
  },

};

/**
 * Created by Mateusz on 15.04.2017.
 */

var express = require('express');
var https = require('https');
var router = express.Router();

var aqi_base_url = 'https://api.waqi.info/map/bounds/';
var aqi_token ='&token=5769436f89cbfa350d4761c352b66cfc939d7721';

/* GET home page. */
router.get('/stations', function(req, res, next) {
    var coords = req.query.coords.join();

    var aqi_url = aqi_base_url + '?latlng='+ coords + aqi_token;

    console.log('Stations API, request: '+aqi_url);
    callback = function(response) {
        var str = '';
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });
        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log(str);
            var stacje = JSON.parse(str).data;
            console.log(stacje);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({stations:stacje}));
        });
    }
    https.request(aqi_url, callback).end();
});


module.exports = router;

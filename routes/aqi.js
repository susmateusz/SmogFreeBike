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

    callback = function(response) {
        var str = '';
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });
        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            var stacje = JSON.parse(str).data;
            update_stations(stacje, req.query.coords);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({stations:stacje}));
        });
    }
    https.request(aqi_url, callback).end();
});




























function update_stations(stations, coords){
    var optimize = false;
    var sum = 0;
    stations.forEach(function(entry){
       sum += parseInt(entry["aqi"]);
    });
    var avg = sum / stations.length;
    var optimized = [
        {lat: 51.113622, lon: 17.063259, uid: 8132, aqi: "60"}, //UP
        {lat: 51.221492, lon: 16.978211, uid: 8130, aqi: "50"}, // Szewce
        {lat: 51.119295, lon: 17.000184, uid: 8131, aqi: "56"}, //Zachodnia
        {lat: 51.090894, lon: 16.886287, uid: 8133, aqi: "45"}, //Lotnisko
        {lat: 51.113717, lon: 17.034162, uid: 8134, aqi: "59"} //Uniwersystet

    ];
    optimized.forEach(function(entry){
       if(station_fits(entry, coords)){
           stations.push(entry);
       }
    });
}

function station_fits(station, coords){
    return (station["lat"] > coords[0] && station["lat"] < coords[2] && station["lon"]>coords[1] && station["lon"]<coords[3]);
}

module.exports = router;

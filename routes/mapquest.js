/**
 * Created by Mateusz on 15.04.2017.
 */

var express = require('express');
var https = require('https');
var router = express.Router();

var mapquest_base_url = "https://www.mapquestapi.com/directions/v2/alternateroutes";
var mapquest_api_key = "4pGVZ2T5yFL5VhWoSgylbTJm2MGN1rgC";
/* GET home page. */
router.get('/routes', function(req, res, next) {
    var coords = req.query.coords;
    mapquest_url = mapquest_base_url
        + "?key=" + mapquest_api_key
        + "&from=" + coords[1] + "," + coords[0]
        + "&to=" + coords[3] + "," + coords[2]
    ;
    console.log(mapquest_url);
    var coords_parsed = [];
    coords.forEach(function(entry){
       coords_parsed.push(parseInt(entry));
    });
    var center = [(coords[0]+coords[2])/2,(coords[1]+coords[3])/2];

    var callback = function(response) {
        var str = '';
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });
        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            var routes = JSON.parse(str);
            console.log(routes.route.shape.shapePoints);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({route: routes.route.shape.shapePoints }));
        });
    }
    https.request(mapquest_url, callback).end();
 });


module.exports = router;

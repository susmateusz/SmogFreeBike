/**
 * Created by Mateusz on 15.04.2017.
 */

var express = require('express');
var https = require('https');
var router = express.Router();

var mapquest_base_url = "http://www.mapquestapi.com/directions/v2/alternateroutes";
var mapquest_api_key = "4pGVZ2T5yFL5VhWoSgylbTJm2MGN1rgC";
/* GET home page. */
router.get('/routes', function(req, res, next) {

    mapquest_url = mapquest_base_url +
            "?key=" + mapquest_api_key;
    var coords = req.query.coords.join();
    console.log(coords);
 });


module.exports = router;

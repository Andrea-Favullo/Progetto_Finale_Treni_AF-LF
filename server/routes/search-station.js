var express = require('express');
var router = express.Router();
var Trenitalia = require("api-trenitalia");
var moment = require('moment');

router.get('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    //richiesta mongodb
});

router.get('/name/:stationName', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    station_name = req.params.stationName;

    //richiesta mongodb
});

module.exports = router;
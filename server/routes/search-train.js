var express = require('express');
var router = express.Router();
var Trenitalia = require("api-trenitalia");
var moment = require('moment');

router.get('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    (async () => {
        const t = new Trenitalia();

        const stations_from = await t.autocomplete("milano");
        const station_from = stations_from[0].name;
        const stations_to = await t.autocomplete("bari");
        const station_to = stations_to[0].name;

        const date = moment().format("DD/MM/YYYY");
        const solutions = await t.getOneWaySolutions(station_from, station_to, date, "13", 2, 0);
        
        console.log(solutions)
        res.send(solutions);
    })();
});

router.get('/from-to/:DepartureStation/:ArrivalStation', function (req, res, next) {
    
    
    res.setHeader('Access-Control-Allow-Origin', '*');

    (async () => {
        const t = new Trenitalia();

        const input_station_from = req.params.DepartureStation;
        const input_station_to = req.params.ArrivalStation;

        console.log(input_station_from)
        console.log(input_station_to)

        const stations_from = await t.autocomplete(input_station_from);
        const stations_to = await t.autocomplete(input_station_to);

        const date = moment().format("DD/MM/YYYY");
        const solutions = await t.getOneWaySolutions(stations_from[0].name, stations_to[0].name, date, "13", 2, 0);

        console.log(solutions);
        res.send(solutions);
    })();
});
router.get('/train-id/:trainID', function (req, res, next) {
    
    const train_id = req.params.trainID;
    console.log(train_id)

    var http = require('http');
    var options = {
        host: 'www.viaggiatreno.it',
        path: `/viaggiatrenonew/resteasy/viaggiatreno/cercaNumeroTreno/${train_id}`
    };

    callback = function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            console.log(str)
            str = JSON.parse(str)
            console.log(str);
            res.send( new Date(str.dataPartenza) )
        });
    }

    http.request(options, callback).end()
});

module.exports = router;

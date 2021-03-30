var express = require('express');
var router = express.Router();
var Trenitalia = require("api-trenitalia");
var moment = require('moment');

/* GET home page. */
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
        
        id_solution = solutions[0]["idsolution"]
        console.log(id_solution)
        //test login
        solution = t.getSolutionInfo(id_solution);
        
        console.log(solution)
        res.send(solution);
    })();
});

router.get('/from-to/:DepartureStation/:ArrivalStation', function (req, res, next) {
    
    const departure_station = req.params.DepartureStation;
    const arrival_station = req.params.ArrivalStation;

    console.log(departure_station)
    console.log(arrival_station)

    res.setHeader('Access-Control-Allow-Origin', '*');

    (async () => {
        const t = new Trenitalia();
        const station_from = departure_station;
        const station_to = arrival_station;

        const date = moment().format("DD/MM/YYYY");
        const solutions = await t.getOneWaySolutions(station_from, station_to, date, "13", 2, 0);
        console.log(solutions)
        res.send(solutions);
    })();
});
router.get('/train-id/:trainID', function (req, res, next) {
    
    const train_id = req.params.trainID;

    console.log(train_id)

    res.setHeader('Access-Control-Allow-Origin', '*');

    (async () => {
        const t = new Trenitalia();
        const station_from = departure_station;
        const station_to = arrival_station;

        const date = moment().format("DD/MM/YYYY");
        const solutions = await t.getOneWaySolutions(station_from, station_to, date, "13", 2, 0);
        console.log(solutions)
        res.send(solutions);
    })();
});

module.exports = router;

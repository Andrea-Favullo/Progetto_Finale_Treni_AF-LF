var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const Trenitalia = require("api-trenitalia");
    const moment = require('moment');

    res.setHeader('Access-Control-Allow-Origin', '*');

    (async () => {
        const t = new Trenitalia();
        const stations_from = await t.autocomplete("milano");
        const station_from = stations_from[0].name;
        const stations_to = await t.autocomplete("bari");
        const station_to = stations_to[0].name;

        const date = moment().add(3, 'months').format("DD/MM/YYYY");
        const solutions = await t.getOneWaySolutions(station_from, station_to, date, "13", 2, 0);
        res.send(solutions);
    })();
});

module.exports = router;

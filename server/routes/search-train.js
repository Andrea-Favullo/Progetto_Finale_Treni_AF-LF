//librerie installate
var express = require('express');
var router = express.Router();
var Trenitalia = require("api-trenitalia");
var moment = require('moment');
var request = require('request');
var DomParser = require('dom-parser');
var got = require('got');
var jsdom = require("jsdom");
var { JSDOM } = jsdom;

/* ----------------------------------------- */
//route di test dell'API
router.get('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    (async () => {
        const t = new Trenitalia();

        const stations_from = await t.autocomplete("milano");
        const station_from = stations_from[0].name;
        const stations_to = await t.autocomplete("bari");
        const station_to = stations_to[0].name;

        const date = moment().format("DD/MM/YYYY");
        const solutions = await t.getOneWaySolutions(station_from, station_to, date, "13", 1, 0);
        
        console.log(solutions)
        res.send(solutions);
    })();
});

//route che restituisce i treni che portano da una stazione ad un'altra
router.get('/from-to/:DepartureStation/:ArrivalStation', function (req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', '*');

    (async () => {
        const t = new Trenitalia();

        const input_station_from = req.params.DepartureStation;
        const input_station_to = req.params.ArrivalStation;

        console.log("Stazione di partenza: \"" + input_station_from + "\"")
        console.log("Stazione di partenza: \"" + input_station_to + "\"")

        const stations_from = await t.autocomplete(input_station_from);
        const stations_to = await t.autocomplete(input_station_to);

        const date = moment().format("DD/MM/YYYY");
        const solutions = await t.getOneWaySolutions(stations_from[0].name, stations_to[0].name, date, "13", 2, 0);

        console.log("\n\nSoluzioni trovate:\n"+solutions+"\nFINE SOLUZIONI -----------------------------");
        res.send(solutions);
    })();
});

//ricerca treno in base all'ID del treno
router.get('/train-id/:trainID', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const train_id = req.params.trainID;
    console.log("ID da ricercare: \"" + train_id + "\"")

    const train_url = `https://www.trenord.it/rest/render/train-sub-detail?trainId=${train_id}`;
    console.log("URL web scraping: \"" + train_url + "\"")

    request(train_url, function (error, response, body) {
        console.error('Errore:', error);
        console.log('Codice di Stato:', response && response.statusCode);

        var super_string = "";

        body = JSON.stringify(JSON.parse(body)['message'])
        //icon-train-prossimi

        //const response = await got(train_url);
        const dom = JSDOM.fragment(body);
        //const dom = new JSDOM(body);
console.log(dom)
        var document = dom.window.document

        console.log(document.querySelectorAll("specific-detail"))

        

        Array.prototype.slice.call(dom.window.document.getElementsByTagName("p")).map(p => {
            const par = p.textContent.replace(/\s+/g, '');
            super_string += par;
        })

        
        super_string = super_string.split("\\n");

        //let stazione_partenza = 
        let img_url = document.querySelector("img").src;
        res.send( body );
    });
});

module.exports = router;

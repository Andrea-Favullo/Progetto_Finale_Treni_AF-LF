//librerie installate
var express = require('express');
var router = express.Router();
var Trenitalia = require("api-trenitalia");
var moment = require('moment');
/* ----------------------------------------- */
//connessione al server MongoDB
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://andrea-favullo:m0ng0D4RI0B4nF1@clustersdg16.dnkc2.mongodb.net/ClusterSDG16?retryWrites=true&w=majority';
//route di test che restituisce tutte le stazioni
router.get('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("TreniDB").collection("dati_geospaziali");
        collection.find({}).toArray((err, result) => {
            if (err) console.log(err.message);
            else { res.send(result); console.log(result); }
            client.close();
        });
    });
});

//ricerca delle stazioni in base al nome
router.get('/name/:stationName', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    station_name = req.params.stationName;
    
    console.log("Nome stazione: \"" + station_name + "\"")
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("TreniDB").collection("dati_geospaziali");
        collection.find({"name" : {"$regex" : `.*${station_name}.*`}}).toArray((err, result) => {
            if (err) console.log(err.message);
            else { res.send(result); console.log(result); }
            client.close();
        });
    });
});

module.exports = router;
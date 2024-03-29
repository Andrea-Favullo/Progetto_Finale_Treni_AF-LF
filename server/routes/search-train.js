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

    //metodi pulizia stringhe
    //mette la prima lettera di una stringa in maiuscolo
    function upperCaseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    //tutte le lettere di una stringa vengono trasformate in minuscolo
    function lowerCaseAllWordsExceptFirstLetters(string) {
        return string.replace(/\S*/g, function (word) {
            return word.charAt(0) + word.slice(1).toLowerCase();
        });
    }

    (async () => {
        const t = new Trenitalia();

        const input_station_from = req.params.DepartureStation;
        const input_station_to = req.params.ArrivalStation;

        console.log("Stazione di partenza: \"" + input_station_from + "\"")
        console.log("Stazione di partenza: \"" + input_station_to + "\"")

        const stations_from = await t.autocomplete(input_station_from);
        console.log("departure autocomplete: "+stations_from[0].name)
        const stations_to = await t.autocomplete(input_station_to);
        console.log("arrival autocomplete: "+stations_to[0].name)

        const date = moment().format("DD/MM/YYYY");
        const solutions = await t.getOneWaySolutions(stations_from[0].name, stations_to[0].name, date, "00", 1, 0);

        console.log("\n\nSoluzioni trovate:\n"+solutions+"\nFINE SOLUZIONI -----------------------------");
        res.send(solutions);
    })();
});

//ricerca treno in base all'ID del treno
router.get('/train-id/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    //recupero ID del treno
    const train_id = "10581";
    console.log("ID da ricercare: \"" + train_id + "\"")
    //recupero URL a cui applicare il Web Scraping
    const train_url = `https://www.trenord.it/rest/render/train-sub-detail?trainId=${train_id}`;
    console.log("URL web scraping: \"" + train_url + "\"")

    request(train_url, function (error, response, body) {
        //print di stato della connessione
        console.error('Errore:', error);
        console.log('Codice di Stato:', response && response.statusCode);

        //recupero il body della pagina HTML e lo trasformo in un DOM
        body_from_JSON = JSON.parse(body)['message']
        const frag = JSDOM.fragment(body_from_JSON);

        //recupero quindi tutti i paragrafi
        var node_list = frag.querySelectorAll("p")

        var staz_inter = frag.querySelectorAll("li")
        
        let stazioni_intermedie = []

        for(let i=0; i<staz_inter.length; i++){

            let stazione = staz_inter.item(i).getElementsByTagName("p")
            
            //nome stazione
            let nome_stazione = stazione.item(0).textContent
            //arrivo alla stazione
            let arrival_time = new String(new String(stazione.item(1).textContent).toString().replace("\n", "").trim()).split("\n")[1].trim().toString()
            
            let secondo_campo = ""
            if (i==0){
                secondo_campo="departure_time"
            }else{
                secondo_campo="arrival_time"
            }
            stazioni_intermedie.push( JSON.parse( `{ \"isFirst\":${i==0},\n\"isLast\":${i==staz_inter.length-1},\n\"station_name\":\"${nome_stazione}\",\n\"${secondo_campo}\":\"${arrival_time}\"\n}` ) )
            
        }

        si=""

        for(let i=0; i<stazioni_intermedie.length; i++){
            let stazione = stazioni_intermedie[i]
            if (!stazione.isLast){
                si += JSON.stringify(stazione) + ",\n"
            }else{
                si += JSON.stringify(stazione)
            }
        }

        //metodi pulizia stringhe
        /**mette la prima lettera di una stringa in maiuscolo
         * @param {* string stringa da elaborare} string 
         */
        function upperCaseFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        /**tutte le lettere di una stringa vengono trasformate in minuscolo
         * @param {* string stringa da elaborare} string 
         */
        function lowerCaseAllWordsExceptFirstLetters(string) {
            return string.replace(/\S*/g, function (word) {
                return word.charAt(0) + word.slice(1).toLowerCase();
            });
        }

        //elaborazione stazione partenza
        var stazione_partenza = node_list.item(2).textContent
        stazione_partenza = lowerCaseAllWordsExceptFirstLetters(stazione_partenza)
        stazione_partenza = upperCaseFirstLetter(stazione_partenza)

        //elaborazione stazione destinazione
        var stazione_destinazione = node_list.item(4).textContent
        stazione_destinazione = lowerCaseAllWordsExceptFirstLetters(stazione_destinazione)
        stazione_destinazione = upperCaseFirstLetter(stazione_destinazione)

        //recupero l'url dell'immagine del tipo del treno
        var img_url = frag.querySelector("img").src
        
        //elaboro la risposta e la consegno
        response = `{ \n\t\"exists\":${stazione_partenza!=""},\n\t\"train_id\":\"${train_id}\", \n\t\"departure_st\":\"${stazione_partenza}\", \n\t\"arrival_st\":\"${stazione_destinazione}\", \n\t\"img_url\":\"${img_url}\", \"middle_stations\":[${si}] \n}`
        console.log("Contenuti elaborati:\n"+response)
        res.send( JSON.parse(response) );
    });
});

//ricerca treno in base all'ID del treno
router.get('/train-id/:trainID', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    //recupero ID del treno
    const train_id = req.params.trainID;
    console.log("ID da ricercare: \"" + train_id + "\"")
    //recupero URL a cui applicare il Web Scraping
    const train_url = `https://www.trenord.it/rest/render/train-sub-detail?trainId=${train_id}`;
    console.log("URL web scraping: \"" + train_url + "\"")

    request(train_url, function (error, response, body) {
        //print di stato della connessione
        console.error('Errore:', error);
        console.log('Codice di Stato:', response && response.statusCode);

        //recupero il body della pagina HTML e lo trasformo in un DOM
        body_from_JSON = JSON.parse(body)['message']
        //res.send(body_from_JSON)
        const frag = JSDOM.fragment(body_from_JSON);

        //recupero quindi tutti i paragrafi
        var node_list = frag.querySelectorAll("p")

        var staz_inter = frag.querySelectorAll("li")
        
        let stazioni_intermedie = []

        for(let i=0; i<staz_inter.length; i++){

            let stazione = staz_inter.item(i).getElementsByTagName("p")
            
            //nome stazione
            let nome_stazione = stazione.item(0).textContent

            //arrivo alla stazione
            let is_suppressed = new String(new String(stazione.item(1)))
            if(is_suppressed!="null"){
                is_suppressed = new String(new String(stazione.item(1).textContent).toString().replace("\n", "").trim()).split("\n")[1]
            }else{
                is_suppressed = new String(new String(stazione.item(0).textContent).toString().replace("\n", "").trim()).split("\n")[1]
            }
            let arrival_time = new String()
            
            if (is_suppressed){
                arrival_time = is_suppressed.trim().toString()
            }else{
                arrival_time = "Treno soppresso"
            }
            
            let secondo_campo = ""
            if (i==0){
                secondo_campo="departure_time"
            }else{
                secondo_campo="arrival_time"
            }
            stazioni_intermedie.push( JSON.parse( `{ \"isFirst\":${i==0},\n\"isLast\":${i==staz_inter.length-1},\n\"station_name\":\"${nome_stazione}\",\n\"${secondo_campo}\":\"${arrival_time}\"\n}` ) )
            
        }

        si=""

        for(let i=0; i<stazioni_intermedie.length; i++){
            let stazione = stazioni_intermedie[i]
            if (!stazione.isLast){
                si += JSON.stringify(stazione) + ",\n"
            }else{
                si += JSON.stringify(stazione)
            }
        }

        //metodi pulizia stringhe
        //mette la prima lettera di una stringa in maiuscolo
        function upperCaseFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        //tutte le lettere di una stringa vengono trasformate in minuscolo
        function lowerCaseAllWordsExceptFirstLetters(string) {
            return string.replace(/\S*/g, function (word) {
                return word.charAt(0) + word.slice(1).toLowerCase();
            });
        }

        //elaborazione stazione partenza
        var stazione_partenza = node_list.item(2).textContent
        stazione_partenza = lowerCaseAllWordsExceptFirstLetters(stazione_partenza)
        stazione_partenza = upperCaseFirstLetter(stazione_partenza)

        //elaborazione stazione destinazione
        var stazione_destinazione = node_list.item(4).textContent
        stazione_destinazione = lowerCaseAllWordsExceptFirstLetters(stazione_destinazione)
        stazione_destinazione = upperCaseFirstLetter(stazione_destinazione)

        //recupero l'url dell'immagine del tipo del treno
        var img_url = frag.querySelector("img").src
        
        //elaboro la risposta e la consegno
        response = `{ \n\t\"exists\":${stazione_partenza!=""},\n\t\"train_id\":\"${train_id}\", \n\t\"departure_st\":\"${stazione_partenza}\", \n\t\"arrival_st\":\"${stazione_destinazione}\", \n\t\"img_url\":\"${img_url}\", \"middle_stations\":[${si}] \n}`
        console.log("Contenuti elaborati:\n"+response)
        res.send( JSON.parse(response) );
    });
});


//restituisce avviso
router.get('/avvisi', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const info_url = `https://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/news/0/it`;
    console.log("URL web scraping: \"" + info_url + "\"")

    request(info_url, function (error, response, body) {
        //print di stato della connessione
        console.error('Errore:', error);
        console.log('Codice di Stato:', response && response.statusCode);

        let testo = new String(JSON.parse(body)[0].testo).toString();
        
        console.log(new String(testo).replace("\r",""))
        
        //console.log(new String(testo).replace("\n","").toString())
        let result = `{ \"message\": \"${new String(testo).replace("\n","").toString()}\" }`
        result = new String(result).replace("\r","").toString();
        res.send( JSON.parse(result) );
    });
});

module.exports = router;

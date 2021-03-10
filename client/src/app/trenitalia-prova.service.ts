import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrenitaliaProvaService {

  constructor() { }


  prova(){
    const Trenitalia = require("api-trenitalia");
    const moment = require('moment');
    (async () => {
        const t = new Trenitalia();
        const stations_from = await t.autocomplete("milano");
        const station_from = stations_from[0].name;
        const stations_to = await t.autocomplete("bari");
        const station_to = stations_to[0].name;

        const date = moment().add(3, 'months').format("DD/MM/YYYY");
        const solutions = await t.getOneWaySolutions(station_from, station_to, date, "13", 2, 0);
        console.log(solutions);
    })();
  }

}

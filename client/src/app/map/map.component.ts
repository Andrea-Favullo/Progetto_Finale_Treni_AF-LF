import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrenitaliaProvaService } from "../trenitalia-prova.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title = 'map';
  obs: Observable<Object> | undefined;
  dati: any;

  //Aggiungiamo latitudine e longitudine di un luogo
  lat: number = 45.462341; //TEST
  lng: number = 9.209277; //TEST
  staz_partenza : any;
  staz_destinazione : any;
  /* {
    _id: 606d96c079d2602f28b96321,
    coordinates: [ 9.209277, 45.462341 ],
    id_reg: 1,
    id_staz: 'S01650',
    name: 'Milano Dateo',
    regione: 'Lombardia'
  },
*/
  constructor(public trenitalia: TrenitaliaProvaService) { }

  ngOnInit(): void {
  }

  richiestaPosizioneStazione(nomestazione: HTMLInputElement): void {
    this.obs = this.trenitalia.ricercaNomeStazione(nomestazione.value);
    this.obs.subscribe((data) => {
      this.dati = data;
      console.log(this.dati)
    });
  }

}

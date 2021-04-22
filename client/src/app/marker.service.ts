import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrenitaliaProvaService } from "./trenitalia-prova.service";
import * as L from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  /*trenitalia prova service
  metodo stazioni che prende i dati delle stazioni in base al nome che richiama il metodo
  */


  stations: string = '/assets/stazioni_coord.geojson';
  obs: Observable<Object> | undefined;
  dati: any;

  historymap : any;
  historydati : any;

  constructor(private http: HttpClient, public trenitalia: TrenitaliaProvaService) { }

  trenitaliastazioniget(nomestazione: HTMLInputElement){
    this.obs = this.trenitalia.ricercaNomeStazione(nomestazione.value);
    this.obs.subscribe((data) => {
      this.dati = data;
      console.log(this.dati)
    });
  }

  makeStationMarkers(map: any, dati : any): void {
      let stazioni = dati;
      console.log(stazioni);
      for (const c of stazioni) {
        const lon = c.coordinates[0];
        const lat = c.coordinates[1];
        const marker = L.marker([lat, lon]);

        marker.addTo(map);
      }
      this.historydati = dati
      this.historymap = map
  }

  clearStationMarkers(map: any): void {
      let stazioni = this.historydati;
      console.log(stazioni);
      if(stazioni != undefined){
        for (const c of stazioni) {
          const lon = c.coordinates[0];
          const lat = c.coordinates[1];
          const marker = L.marker([lat, lon]);

          marker.removeFrom(map);
          marker.remove();
        }

      }

  }
}

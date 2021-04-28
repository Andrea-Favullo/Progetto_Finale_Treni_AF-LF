import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrenitaliaProvaService } from "./trenitalia-apirest.service";
import * as L from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  /*trenitalia apirest service
  metodo stazioni che prende i dati delle stazioni in base al nome che richiama il metodo
  */

  markerList = new Array<L.Marker<any>>();
  stations: string = '/assets/stazioni_coord.geojson';
  obs: Observable<Object> | undefined;
  dati: any;

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

      for (const marker of this.markerList) {
        marker.removeFrom(map);
      }

      for (const c of stazioni) {
        const lon = c.lon;
        const lat = c.lat;
        let  marker = L.marker([lat, lon]);
        this.markerList.push(marker);
        marker.addTo(map);

        //Pan and Zoom
        map.panTo([lat, lon]);
        map.setZoom(12);

        //map.setViewOffset(e.target.getLatLng(),[0,100],9);
      }

      //map.panTo([lon, lat]);
  }
}

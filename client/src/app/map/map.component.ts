import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrenitaliaProvaService } from "../trenitalia-prova.service";
import { MarkerService } from '../marker.service';
import * as L from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = '/assets/station.png'; //assets/marker-icon.png
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [32, 32], //[25, 41]
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [32, 32] //[41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
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
  constructor(
    public trenitalia: TrenitaliaProvaService,
    private markerService: MarkerService
  ) { }

  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    //this.markerService.makeStationMarkers(this.map);
  }

  richiestaPosizioneStazione(nomestazione: HTMLInputElement): void {
    this.obs = this.trenitalia.ricercaNomeStazione(nomestazione.value);
    this.obs.subscribe((data) => {
      this.dati = data;
      this.markerService.makeStationMarkers(this.map, this.dati);
      console.log(this.dati)
    });
  }

}

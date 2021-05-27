import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrenitaliaProvaService } from "../../API-REST/trenitalia.service";
import { MarkerService } from '../../leaflet-services/marker.service';
import * as L from 'leaflet';
import { SearchStationListService } from '../search-station-list.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = '/assets/station.png'; //assets/marker-icon.png
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
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


  //Aggiungiamo latitudine e longitudine di un luogo
  lat: number = 45.462341; //TEST
  lng: number = 9.209277; //TEST
  staz_partenza: any;
  staz_destinazione: any;
  /*
    esempio dati
  {
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
    private markerService: MarkerService,
    private searchStationList: SearchStationListService
  ) { }

  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [41.900636, 12.502026],
      zoom: 6
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initMap();
    console.log(this.searchStationList.getStationList());
    if (this.searchStationList.getStationList() != null && this.searchStationList.getStationList() != undefined && this.searchStationList.getStationList() != {}) {
      this.markerService.makeStationMarkers(this.map, this.searchStationList.getStationList());
    }
  }

  richiestaPosizioneStazione(nomestazione: HTMLInputElement): void {
    this.searchStationList.setStationList({});
    this.obs = this.trenitalia.ricercaNomeStazione(nomestazione.value);
    this.obs.subscribe((data) => {
      this.searchStationList.setStationList(data);
      this.markerService.makeStationMarkers(this.map, this.searchStationList.getStationList());
      console.log(this.searchStationList.getStationList())
    });
  }

}

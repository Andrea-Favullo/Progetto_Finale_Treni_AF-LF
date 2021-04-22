import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrenitaliaProvaService } from "../trenitalia-apirest.service";

@Component({
  selector: 'app-search-station',
  templateUrl: './search-station.component.html',
  styleUrls: ['./search-station.component.css']
})
export class SearchStationComponent implements OnInit {
  title = 'client';
  obs: Observable<Object> | undefined;
  dati: any;

  constructor(public trenitalia: TrenitaliaProvaService) { }

  ngOnInit(): void {
  }

  richiestaNomeStazione(nomestazione: HTMLInputElement): void {
    this.obs = this.trenitalia.ricercaNomeStazione(nomestazione.value);
    this.obs.subscribe((data) => {
      this.dati = data;
      console.log(this.dati)
    });
  }

}

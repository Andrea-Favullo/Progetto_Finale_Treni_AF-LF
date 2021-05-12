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
  loading: boolean = false;

  constructor(public trenitalia: TrenitaliaProvaService) { }

  ngOnInit(): void {}

  isLoading(): boolean{
    return this.loading;
  }

  onRequestStarted(): void {
    this.loading = true;
    console.log(`sta caricando`);
  }

  onRequestFinished(): void {
    this.loading = false;
    console.log(`non sta caricando`);
  }

  richiestaNomeStazione(nomestazione: HTMLInputElement): void {
    this.onRequestStarted();
    this.obs = this.trenitalia.ricercaNomeStazione(nomestazione.value);
    this.obs.subscribe((data) => {
      this.dati = data;
      console.log(this.dati)
    });
    this.onRequestFinished();
  }

}

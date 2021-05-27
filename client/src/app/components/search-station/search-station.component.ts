import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrenitaliaProvaService } from "../../API-REST/trenitalia.service";
import { SearchStationListService } from '../search-station-list.service';

@Component({
  selector: 'app-search-station',
  templateUrl: './search-station.component.html',
  styleUrls: ['./search-station.component.css']
})
export class SearchStationComponent implements OnInit {
  //variabili
  title = 'client';
  obs: Observable<Object> | undefined;
  loading: boolean = false;
  dati: any;

  constructor(
    public trenitalia: TrenitaliaProvaService,
    private searchStationList: SearchStationListService
  ) { }

  //all'avvio recupero i risultati di ricerca per sincronizzarli con la mappa
  ngOnInit(): void {
    this.dati = this.searchStationList.getStationList();
  }

  //metodi sullo stato di caricamento
  //restituisce se l'applicazione sta caricando
  isLoading(): boolean {
    return this.loading;
  }
  //dico che l'applicazione sta caricando
  onRequestStarted(): void {
    this.loading = true;
    console.log(`sta caricando`);
  }
  //dico che l'applicazione non sta caricando
  onRequestFinished(): void {
    this.loading = false;
    console.log(`non sta caricando`);
  }

  //recupero tutte le stazioni che hanno il nome specificato
  richiestaNomeStazione(nomestazione: HTMLInputElement): void {
    this.onRequestStarted();
    this.obs = this.trenitalia.ricercaNomeStazione(nomestazione.value);
    this.obs.subscribe((data) => {
      this.searchStationList.setStationList(data);
      console.log(this.searchStationList.getStationList())
      this.dati = this.searchStationList.getStationList();
      this.onRequestFinished();
    });
  }

}

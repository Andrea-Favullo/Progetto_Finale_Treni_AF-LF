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
  title = 'client';
  obs: Observable<Object> | undefined;
  loading: boolean = false;
  dati : any;
  constructor(public trenitalia: TrenitaliaProvaService,
              private searchStationList : SearchStationListService) { }

  ngOnInit(): void {
     this.dati =  this.searchStationList.getStationList();
  }

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
      this.searchStationList.setStationList(data);
      console.log( this.searchStationList.getStationList())
      this.dati =  this.searchStationList.getStationList();
      this.onRequestFinished();
    });
  }

}

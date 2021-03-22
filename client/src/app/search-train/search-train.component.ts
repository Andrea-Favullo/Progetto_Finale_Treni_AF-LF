import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrenitaliaProvaService } from "../trenitalia-prova.service";

@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.css']
})
export class SearchTrainComponent implements OnInit {
  title = 'client';
  obs: Observable<Object> | undefined;
  dati: any;

  constructor(public trenitalia: TrenitaliaProvaService){}

  ngOnInit(): void { }


  richiesta(): void {
    this.obs = this.trenitalia.ricercaEsempio();
    this.obs.subscribe((data) => {
      this.dati = data;
      console.log(this.dati)
    });
  }

  richiestaPartenzaDestinazione(partenza: string, destinazione: string): void {
    this.obs = this.trenitalia.ricercaPartenzaArrivo(partenza, destinazione);
    this.obs.subscribe((data) => {
      this.dati = data;
      console.log(this.dati)
    });
  }
}

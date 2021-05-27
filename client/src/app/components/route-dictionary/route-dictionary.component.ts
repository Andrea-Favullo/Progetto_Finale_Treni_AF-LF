import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrenitaliaProvaService } from "../../API-REST/trenitalia.service";
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-route-dictionary',
  templateUrl: './route-dictionary.component.html',
  styleUrls: ['./route-dictionary.component.css']
})
export class RouteDictionaryComponent implements OnInit {
  //variabili
  title = 'client';
  obs: Observable<Object> | undefined;
  dati: any[] = [];
  minnum: number = 0;
  maxnum: number = 31;
  exists_counter: number = 0;
  exists_limit: number = 8;
  collection: any[] = [];
  log: any[][] = [[]];
  loading: boolean = false;

  constructor(public trenitalia: TrenitaliaProvaService) { }

  //all'avvio genero il primo batch di dati
  ngOnInit(): void {
    this.listainitIdTreno();
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

  //recupero i treni in base ai loro id (da x a y)
  listainitIdTreno(): void {
    this.onRequestStarted();
    this.exists_limit = 31;
    this.exists_counter = 0;
    this.dati = [];
    for (let idtreno = this.minnum; idtreno < this.maxnum; idtreno++) {
      this.obs = this.trenitalia.ricercaIdTreno("" + idtreno);
      this.obs.subscribe((data: any) => {
        if (data['exists']) {
          if (this.exists_limit > this.exists_counter) {
            this.exists_counter++;
            this.dati.push(data);
            this.collection.push(data);
          }
        }
        this.onRequestFinished();
      });
    }
    this.log.push(this.collection);
    console.log(this.log);
  }

  //metodi per procedere nel dizionario
  //avanti nella lista
  listavanti(): void {
    this.minnum = this.maxnum + 1
    this.maxnum = this.minnum + 31
    this.listainitIdTreno()
  }
  //indietro nella lista
  listdietro(): void {
    if (this.minnum > 0) {
      this.maxnum = this.minnum - 1
      this.minnum = this.maxnum - 31
      this.listainitIdTreno()
    }
  }

  //viene ricercato un treno che abbia quel preciso id
  richiestaIdTreno(idTreno: HTMLInputElement): void {
    this.onRequestStarted();
    this.exists_limit = 1;
    this.dati = [];
    this.obs = this.trenitalia.ricercaIdTreno(idTreno.value);
    this.obs.subscribe((data) => {
      this.dati[0] = data;
      console.log(this.dati)
      this.onRequestFinished();
    });
  }

}

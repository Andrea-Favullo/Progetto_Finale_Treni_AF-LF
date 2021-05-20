import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrenitaliaProvaService } from "../trenitalia-apirest.service";

@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.css']
})
export class SearchTrainComponent implements OnInit {
  title = 'client';
  obs: Observable<Object> | undefined;
  dati: any;
  tiporichiesta: string = "NIENTE";
  loading: boolean = false;

  constructor(public trenitalia: TrenitaliaProvaService) { }

  ngOnInit(): void { }

  isLoading(): boolean {
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

  ConvOrario(ms: any): any {
    var date = new Date(ms);
    return date;
  }

  capitalizeWords(text: string): string {
    text = text.toLowerCase();
    return text.replace(/(?:^|\s)\S/g, (res) => {
      return res.toUpperCase();
    })
  };

  richiesta(): void {
    this.tiporichiesta = "STANDBY";
    this.onRequestStarted();
    this.obs = this.trenitalia.ricercaEsempio();
    this.obs.subscribe((data) => {
      this.dati = data;
      console.log(this.dati)
      this.tiporichiesta = "PARTENZA_DEST";
      this.onRequestFinished();
    });
  }

  richiestaPartenzaDestinazione(partenza: HTMLInputElement, destinazione: HTMLInputElement): void {
    this.tiporichiesta = "STANDBY";
    this.onRequestStarted();
    if (partenza.value.replace(" ", "") == "" || destinazione.value.replace(" ", "") == "") {
      this.richiesta();
    } else {

      this.obs = this.trenitalia.ricercaPartenzaArrivo(partenza.value, destinazione.value);
      this.obs.subscribe((data) => {
        this.dati = data;
        console.log(this.dati);
        this.tiporichiesta = "PARTENZA_DEST";
        this.onRequestFinished();
      });

    }
  }

  richiestaIdTreno(id: HTMLInputElement): void {
    this.tiporichiesta = "STANDBY";
    this.dati = [];
    this.onRequestStarted();
    let id_value = id.value;
    if (id_value.replace(" ", "") == "") {
      id_value="10581"
    }
    this.obs = this.trenitalia.ricercaIdTreno(id_value);
    this.obs.subscribe((data: any) => {
      if (data['exists']) {
        this.dati = data;
        console.log(this.dati);
        this.tiporichiesta = "ID_TRENO";
      } else {
        this.tiporichiesta = "NON_ESISTE";
        this.dati = "non esiste"
        console.log(this.dati);
      }
      this.onRequestFinished();
    });

  }
  toText(duration: string): string {

    let splitted = duration.split(":");
    let result = "";
    let ore = splitted[0];
    let minuti = splitted[1];

    if (ore != "00") {

      if (ore.charAt(0) == "0") {
        ore = ore.charAt(1)
      }
      result = result + ore + " ore "

      if (minuti.charAt(0) == "0") {
        minuti = minuti.charAt(1)
      }
      result = result + minuti + " minuti "
    } else {
      if (minuti.charAt(0) == "0") {
        minuti = minuti.charAt(1)
      }
      result = result + minuti + " minuti "
    }

    return result;
  }
}

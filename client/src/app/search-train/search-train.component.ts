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

  constructor(public trenitalia: TrenitaliaProvaService){}

  ngOnInit(): void {
  }

  ConvOrario(ms : any): any {
    var date = new Date(ms);
    return date;
  }

  richiesta(): void {
    this.obs = this.trenitalia.ricercaEsempio();
    this.obs.subscribe((data) => {
      this.dati = data;
      console.log(this.dati)
    });
  }

  richiestaPartenzaDestinazione(partenza: HTMLInputElement, destinazione: HTMLInputElement): void {
    this.obs = this.trenitalia.ricercaPartenzaArrivo(partenza.value, destinazione.value);
    this.obs.subscribe((data) => {
      this.dati = data;
      console.log(this.dati)
    });
  }

  richiestaIdTreno(id: HTMLInputElement): void {
    let id_value = id.value;
    this.obs = this.trenitalia.ricercaIdTreno(id_value);
    this.obs.subscribe((data) => {
      this.dati = data;
      console.log(this.dati)
    });
  }
  toText(duration: string): string{

    let splitted = duration.split(":");
    let result = "";
    let ore = splitted[0];
    let minuti = splitted[1];

    if(ore != "00"){

      if (ore.charAt(0)=="0"){
        ore = ore.charAt(1)
      }
      result = result + ore + " ore "

      if (minuti.charAt(0)=="0"){
        minuti = minuti.charAt(1)
      }
      result = result + minuti + " minuti "
    }else{
      if (minuti.charAt(0)=="0"){
        minuti = minuti.charAt(1)
      }
      result = result + minuti + " minuti "
    }

    return result;
  }
}

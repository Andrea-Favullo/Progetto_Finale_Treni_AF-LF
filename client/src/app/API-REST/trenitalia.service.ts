import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrenitaliaProvaService {
  //link al server
  serverURL="https://3000-blush-aphid-nu40gkcu.ws-eu18.gitpod.io/";

  constructor(private http: HttpClient) { }

  //fa una ricerca da milano centrale a bari centrale
  //semplice test del funzionamento
  ricercaEsempio(){
    const url = `${this.serverURL}search-train/`
    let obs = this.http.get(url);
    console.log(obs);
    return obs;
  }
  //ricerca da una stazione di partenza ad una stazione di destinazione
  ricercaPartenzaArrivo(origin : string, destination : string){
    const url = `${this.serverURL}search-train/from-to/${origin}/${destination}`
    let obs = this.http.get(url);
    console.log(obs);
    return obs;
  }
  //recupero della stazione in base al nome
  ricercaNomeStazione(name: string){
    const url = `${this.serverURL}search-station/name/${name}`
    let obs = this.http.get(url);
    console.log(obs);
    return obs;
  }
  //recupero dei dati di un treno in base al suo id
  ricercaIdTreno(id: string){
    const url = `${this.serverURL}search-train/train-id/${id}`
    let obs = this.http.get(url);
    console.log(obs);
    return obs;
  }
  //recupero avvisi lasciati da trenord sulla rete ferroviaria nazionale
  recuperaAvvisi(){
    const url = `${this.serverURL}search-train/avvisi`
    let obs = this.http.get(url);
    console.log(obs);
    return obs;
  }

}

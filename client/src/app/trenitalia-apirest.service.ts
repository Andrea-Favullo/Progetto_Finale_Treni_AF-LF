import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrenitaliaProvaService {
  serverURL="https://3000-azure-lamprey-su202kqu.ws-eu04.gitpod.io/";

  constructor(private http: HttpClient) { }

  ricercaEsempio(){
    const url = `${this.serverURL}search-train/`
    let obs = this.http.get(url);
    console.log(obs);
    return obs;
  }

  ricercaPartenzaArrivo(origin : string, destination : string){
    const url = `${this.serverURL}search-train/from-to/${origin}/${destination}`
    let obs = this.http.get(url);
    console.log(obs);
    return obs;
  }

  ricercaNomeStazione(name: string){
    const url = `${this.serverURL}search-station/name/${name}`
    let obs = this.http.get(url);
    console.log(obs);
    return obs;
  }

  ricercaIdTreno(id: string){
    const url = `${this.serverURL}search-train/train-id/${id}`
    let obs = this.http.get(url);
    console.log(obs);
    return obs;
  }

  recuperaAvvisi(){
    const url = `${this.serverURL}search-train/avvisi`
    let obs = this.http.get(url);
    console.log(obs);
    return obs;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrenitaliaProvaService {
  serverURL="https://3000-jade-snail-lojcmnny.ws-eu03.gitpod.io/";

  constructor(private http: HttpClient) { }

  ricercaPartenzaArrivo(){
    const url = `${this.serverURL}`
    let obs = this.http.get(url);
    console.log(obs);
    return obs;
  }

}

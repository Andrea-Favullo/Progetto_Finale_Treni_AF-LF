import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeStazionePopup(data: any): string {
    if(data != undefined){
      return `` +
      `<div>Stazione: ${ data.name }</div>` +
      `<div>Regione: ${ data.regione }</div>` +
      `<div>id: ${ data.id_staz }</div>` +
      `<div>lat: ${ data.lat }</div>` +
      `<div>lon: ${ data.lon }</div>`
    } else {
      return "undefined"
    }
  }
}

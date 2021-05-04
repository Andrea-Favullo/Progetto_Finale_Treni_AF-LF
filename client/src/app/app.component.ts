import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrenitaliaProvaService } from "./trenitalia-apirest.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  obs: Observable<Object> | undefined;
  dati: any;
  dati_informa: any;

  constructor(public trenitalia: TrenitaliaProvaService){}

  ngOnInit(): void {
    this.obs = this.trenitalia.recuperaAvvisi();
    this.obs.subscribe((data) => {
      this.dati_informa = data;
      console.log(this.dati_informa)
    });
  }


  richiesta(): void {
    this.obs = this.trenitalia.ricercaEsempio();
    this.obs.subscribe((data) => {
      this.dati = data;
      console.log(this.dati)
    });
  }

}

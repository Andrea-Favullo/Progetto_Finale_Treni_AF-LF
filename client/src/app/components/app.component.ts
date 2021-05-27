import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrenitaliaProvaService } from "../API-REST/trenitalia.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //variabili
  title = 'client';
  obs: Observable<Object> | undefined;
  dati: any;
  dati_informa: any;
  loading: boolean = false;

  constructor(public trenitalia: TrenitaliaProvaService) { }

  //all'avvio recupero gli avvisi trenord
  ngOnInit(): void {
    this.obs = this.trenitalia.recuperaAvvisi();
    this.obs.subscribe((data) => {
      this.dati_informa = data;
      console.log(this.dati_informa)
    });
  }

}

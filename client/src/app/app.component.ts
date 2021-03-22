import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrenitaliaProvaService } from "./trenitalia-prova.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

}

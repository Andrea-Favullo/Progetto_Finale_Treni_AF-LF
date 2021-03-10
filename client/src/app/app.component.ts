import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

submit(query: HTMLInputElement): void {

    if (!query.value) {
      return;
    }
    this.query = query.value;
    this.obsStati = this.stati_service.search(this.query);
    this.obsStati.subscribe((data) => { this.nazioni = data; console.log(this.nazioni) });
  }

}

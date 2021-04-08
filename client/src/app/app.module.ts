import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SearchTrainComponent } from './search-train/search-train.component';
import { SearchStationComponent } from './search-station/search-station.component';
import { RouteDictionaryComponent } from './route-dictionary/route-dictionary.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchTrainComponent,
    SearchStationComponent,
    RouteDictionaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SearchTrainComponent } from './search-train/search-train.component';
import { SearchStationComponent } from './search-station/search-station.component';
import { RouteDictionaryComponent } from './route-dictionary/route-dictionary.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { MarkerService } from './marker.service';
import { PopupService } from './popup.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchTrainComponent,
    SearchStationComponent,
    RouteDictionaryComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBm3HUsSk1C3VoEYn2rdbHU3_fylsQ5DWk'}),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    MarkerService,
    PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

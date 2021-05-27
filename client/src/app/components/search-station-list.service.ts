import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchStationListService {
  stationsList: any;
  constructor() { }

  getStationList() {
    return this.stationsList;
  }

  setStationList(sl: any) {
    this.stationsList = sl;
  }
}

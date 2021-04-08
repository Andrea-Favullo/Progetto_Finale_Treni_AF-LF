import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchTrainComponent } from './search-train/search-train.component';
import { SearchStationComponent} from './search-station/search-station.component';
import { RouteDictionaryComponent} from './route-dictionary/route-dictionary.component';

const routes: Routes = [
  { path: 'routedictionary', component: RouteDictionaryComponent},
  { path: 'searchstation', component: SearchStationComponent},
  { path: 'searchtrain', component: SearchTrainComponent},
  { path: 'home', component: HomeComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

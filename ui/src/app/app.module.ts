import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NguiMapModule} from '@ngui/map';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { MapComponent } from './map/map.component';

const appRoutes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'map', canActivate: [AuthGuard], component: MapComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js'}),
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

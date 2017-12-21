import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ALL_COMPONENTS } from './components';
import { ROUTES } from './app.routing';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CheckpointLocationService } from './services/db/checkpoint-location.services';
import { ALL_SERVICES } from './services/index';
import { SettingsComponent } from './components/settings/settings.component';
import { MomentModule } from 'angular2-moment';
import 'moment/locale/de';

@NgModule({
  declarations: [
    AppComponent,
    ...ALL_COMPONENTS,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { enableTracing: false }),  
    FormsModule,
    ReactiveFormsModule,
    MomentModule
  ],
  providers: [
      ...ALL_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

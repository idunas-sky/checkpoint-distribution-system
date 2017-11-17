import { ReactiveFormsModule } from '@angular/forms';
import { FakeCheckpointLocationService } from './services/mock/fake-checkpoint-location.service';
import { DbCheckpointLocationService } from './services/db-checkpoint-location.service';
import { FakeService } from './services/mock/fake.service';
import { ALL_COMPONENTS } from './components';
import { ROUTES } from './app.routing';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    ...ALL_COMPONENTS
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { enableTracing: true }),  
    ReactiveFormsModule
  ],
  providers: [
    FakeService,
    { provide: DbCheckpointLocationService, useClass: FakeCheckpointLocationService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

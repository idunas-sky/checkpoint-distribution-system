import {
    CheckpointLocationDetailsComponent,
} from './components/checkpoint-location/details/checkpoint-location-details.component';
import { CheckpointLocationListComponent } from './components/checkpoint-location/list/checkpoint-location-list.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'locations', children: [
            { path: 'details/:id', component: CheckpointLocationDetailsComponent },
            { path: 'details', component: CheckpointLocationDetailsComponent },
            { path: '**', component: CheckpointLocationListComponent },
        ]
    },
    { path: '', pathMatch: 'full', redirectTo: '/home' }
]
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as L from 'leaflet';
import {MapClickEventArgs} from "./map-click.event-args";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    private _map: L.Map;

    @Output() public locationSelected = new EventEmitter<MapClickEventArgs>();

    constructor() {
    }

    ngOnInit() {
        this._map = L.map('map');
        this._map.setView([51.505, -0.09], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: ''
        }).addTo(this._map);

        this._map.addEventListener('click', (e: L.LeafletMouseEvent) => {
            this.locationSelected.emit(new MapClickEventArgs(e));
        });
    }
}

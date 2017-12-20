import { GeoLocation } from '../../models/geo-location';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { MapClickEventArgs } from "./map-click.event-args";
import { SettingsService } from '../../services/db/settings.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    private _map: L.Map;
    private _marker: L.Marker;

    @Input() public startLocation: GeoLocation;
    @Output() public locationSelected = new EventEmitter<MapClickEventArgs>();

    constructor(private _settings: SettingsService) {
    }

    ngOnInit() {
        this._map = L.map('map');

        if (this.startLocation) {
            this._setMarker(this.startLocation.latitude, this.startLocation.longitude);
            this._map.setView([this.startLocation.latitude, this.startLocation.longitude], 16);
        }
        else {
            // TODO: Make default location configurable
            this._map.setView([48.88, 8.89], 11);
        }


        this._settings.loadSettings().subscribe(settings => {
            L.tileLayer(
                settings.mapUrl,
                {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.streets',
                    accessToken: settings.mapAccessToken
                }).addTo(this._map);
        });

        this._map.addEventListener('click', (e: L.LeafletMouseEvent) => {
            this._setMarker(e.latlng.lat, e.latlng.lng);
            this.locationSelected.emit(new MapClickEventArgs(e));
        });
    }

    private _setMarker(latitude: number, longitude: number) {
        // Set a new marker if none is active
        if (!this._marker) {
            this._marker = L.marker([latitude, longitude]).addTo(this._map)
            return;
        }

        // Move the active marker otherwise
        this._marker.setLatLng(L.latLng(latitude, longitude));
    }
}

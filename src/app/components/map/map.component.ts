import { GeoLocation } from '../../models/geo-location';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { MapClickEventArgs } from "./map-click.event-args";
import { SettingsService } from '../../services/db/settings.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

export enum MapMarkerMode {
    Single,
    Multiple
}

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    private _map: L.Map;
    private _markers: L.Marker[] = [];

    @Input() public markerMode: MapMarkerMode;
    @Input() public startLocation: GeoLocation;
    @Output() public locationSelected = new EventEmitter<MapClickEventArgs>();

    constructor(private _settings: SettingsService) {
    }

    ngOnInit() {
        this._map = L.map('map');

        if (this.startLocation) {
            this.setViewLocation(this.startLocation, 16);
        }
        else {
            // TODO: Make default location configurable
            this.setViewLocation(new GeoLocation(48.88, 8.89), 11);
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
            this.setMarker(new GeoLocation(e.latlng.lat, e.latlng.lng));
            this.locationSelected.emit(new MapClickEventArgs(e));
        });
    }

    public setViewLocation(location: GeoLocation, zoomLevel: number) {
        this._map.setView([location.latitude, location.longitude], zoomLevel);
    }

    public setMarker(location: GeoLocation) {
        if (this.markerMode === MapMarkerMode.Single && this._markers.length > 0) {
            // A marker already exists and we are in single-mode,
            // thus we need to move the existing marker
            this._markers[0].setLatLng(L.latLng(location.latitude, location.longitude));
            return;
        }

        // In all other cases we can safely add a new marker
        this._markers.push(L.marker([location.latitude, location.longitude]).addTo(this._map));
    }
}

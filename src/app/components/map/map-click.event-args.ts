import * as L from 'leaflet';

export class MapClickEventArgs {
    containerX: number;
    containerY: number;
    layerX: number;
    layerY: number;
    latitude: number;
    longitude: number;

    constructor(eventArgs: L.LeafletMouseEvent) {
        this.containerX = eventArgs.containerPoint.x;
        this.containerY = eventArgs.containerPoint.y;
        this.layerX = eventArgs.layerPoint.x;
        this.layerY = eventArgs.layerPoint.y;
        this.latitude = eventArgs.latlng.lat;
        this.longitude = eventArgs.latlng.lng;
    }
}
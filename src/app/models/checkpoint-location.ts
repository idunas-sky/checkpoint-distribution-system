import { DbObject } from './db-object';
import { GeoLocation } from './geo-location';

export class CheckpointLocation extends DbObject {
    name: string;
    remarks?: string;
    location: GeoLocation;
}
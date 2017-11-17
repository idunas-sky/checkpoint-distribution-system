import { IDbObject } from './db-object';
import { GeoLocation } from './geo-location';

export class CheckpointLocation implements IDbObject {
    id: string;
    name: string;
    remarks?: string;
    location: GeoLocation;
}
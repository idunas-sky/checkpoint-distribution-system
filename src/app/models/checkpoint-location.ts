import { IDbObject } from './db-object';
import { GeoLocation } from './geo-location';

export class CheckpointLocation implements IDbObject {
    _id: number;
    name: string;
    remarks?: string;
    location: GeoLocation;
}
import {CheckpointLocationService} from './checkpoint-location.services';
import {constructDependencies} from '@angular/core/src/di/reflective_provider';
import {DbObject} from '../../models/db-object';
import {CheckpointLocation} from '../../models/checkpoint-location';

export class DbSchema {
    name: string;
    version: number;
    stores: DbObjectStoreInfo[];

    constructor(init?: Partial<DbSchema>) {
        Object.assign(this, init);
    }
}

export class DbObjectStoreInfo {
    name: string;
    mappingFunc: (obj: DbObject) => DbObject;
    autoIncrement: boolean = true;

    constructor(init?: Partial<DbObjectStoreInfo>) {
        Object.assign(this, init);
    }
}

export enum StoreNames {
    CheckpointLocations = 'checkpoint-locations',
    Settings = 'settings'
}

export const SCHEMA = new DbSchema({
    name: 'cds',
    version: 2,
    stores: [
        new DbObjectStoreInfo({name: StoreNames.CheckpointLocations.toString()}),
        new DbObjectStoreInfo({name: StoreNames.Settings.toString(), autoIncrement: false})
    ]
});
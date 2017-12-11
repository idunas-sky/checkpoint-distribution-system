import { CheckpointLocationService } from './checkpoint-location.services';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { IDbObject } from '../../models/db-object';
import { CheckpointLocation } from '../../models/checkpoint-location';

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
    mappingFunc: (obj: IDbObject) => IDbObject;

    constructor(init?: Partial<DbObjectStoreInfo>) {
        Object.assign(this, init);
    }
}

export enum StoreNames {
    CheckpointLocations = 'checkpoint-locations'
}

export const SCHEMA = new DbSchema({
    name: 'cds',
    version: 1,
    stores: [
        new DbObjectStoreInfo({
            name: StoreNames.CheckpointLocations.toString()
        })
    ]
});
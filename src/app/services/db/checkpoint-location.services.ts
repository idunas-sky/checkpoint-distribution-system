import { StoreNames } from './schema';
import { Injectable } from '@angular/core';
import { CheckpointLocation } from '../../models/checkpoint-location';
import { BaseDbAccessService } from './db.interface.service';

@Injectable()
export class CheckpointLocationService extends BaseDbAccessService<CheckpointLocation> {

    public get StoreName(): string {
        return StoreNames.CheckpointLocations.toString();
    }
}
import { FakeService } from './fake.service';
import { DbCheckpointLocationService } from '../db-checkpoint-location.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CheckpointLocation } from '../../models/checkpoint-location';

@Injectable()
export class FakeCheckpointLocationService extends DbCheckpointLocationService {

    private _items: CheckpointLocation[];

    constructor(private _fakeService: FakeService) {
        super();

        this._items = [
            { id: "1", name: "Vaihingen/Enz", remarks: "Gut verstecken, relativ gut einsehbar", location: { latitude: 48.933436, longitude: 8.961208 } },
            { id: "2", name: "Mühlacker", location: { latitude: 48.948938, longitude: 8.852424 } },
            { id: "4", name: "Ditzingen", location: { latitude: 48.826466, longitude: 9.067556 } },
            { id: "5", name: "Gerlingen", location: { latitude: 48.798975, longitude: 9.065771 } },
            { id: "18", name: "Schwieberdingen", remarks: "Kommentar xyz", location: { latitude: 48.877913, longitude: 9.078301 } }
        ];
    }

    public getList(): Observable<CheckpointLocation[]> {
        return Observable.of(this._items);
    }

    public get(id: string): Observable<CheckpointLocation> {
        return this._fakeService.get(this._items, id);
    }

    public addOrUpdate(value: CheckpointLocation): Observable<CheckpointLocation> {
        return this._fakeService.addOrUpdate(this._items, value);
    }

    public delete(id: string): void {
        this._items = this._fakeService.delete(this._items, id);
    }
}
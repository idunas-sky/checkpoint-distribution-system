import { CheckpointLocation } from '../../../models/checkpoint-location';
import { IndexedDbService } from '../indexed-db.service';
import { CheckpointLocationService } from '../checkpoint-location.services';
import { FakeService } from './fake.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class FakeCheckpointLocationService extends CheckpointLocationService {

    private _items: CheckpointLocation[];

    constructor(
        private _indexedDb: IndexedDbService,
        private _fakeService: FakeService) {
        super(_indexedDb);

        this._items = [
            { _id: 1, name: "Vaihingen/Enz", remarks: "Gut verstecken, relativ gut einsehbar", location: { latitude: 48.933436, longitude: 8.961208 } },
            { _id: 2, name: "Mühlacker", location: { latitude: 48.948938, longitude: 8.852424 } },
            { _id: 4, name: "Ditzingen", location: { latitude: 48.826466, longitude: 9.067556 } },
            { _id: 5, name: "Gerlingen", location: { latitude: 48.798975, longitude: 9.065771 } },
            { _id: 18, name: "Schwieberdingen", remarks: "Kommentar xyz", location: { latitude: 48.877913, longitude: 9.078301 } }
        ];
    }

    public getList(): Observable<CheckpointLocation[]> {
        return Observable.of(this._items);
    }

    public get(id: number): Observable<CheckpointLocation> {
        return this._fakeService.get(this._items, id);
    }

    public addOrUpdate(value: CheckpointLocation): Observable<CheckpointLocation> {
        return this._fakeService.addOrUpdate(this._items, value);
    }

    public delete(id: number): void {
        this._items = this._fakeService.delete(this._items, id);
    }
}
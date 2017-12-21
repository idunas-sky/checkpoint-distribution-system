import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { IndexedDbService } from './indexed-db.service';
import { DbObject } from '../../models/db-object';

@Injectable()
export abstract class BaseDbAccessService<T extends DbObject> {

    constructor(private _db: IndexedDbService) {
    }

    public abstract get StoreName(): string;
    public getList(): Observable<T[]> {
        return this._db.query<T>(this.StoreName);
    }
    public get(id: number): Observable<T> {
        return this._db.get<T>(this.StoreName, id);
    }
    public addOrUpdate(value: T): Observable<T> {
        return this._db.insertOrUpdate(this.StoreName, value);
    }
    public delete(id: number): void {
        this._db.delete(this.StoreName, id).subscribe();
    }
}
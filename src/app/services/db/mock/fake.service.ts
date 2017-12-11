import { IDbObject } from '../../../models/db-object';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class FakeService {

    public get<T extends IDbObject>(items: T[], id: number): Observable<T> {
        return Observable.of(items.find(item => item._id === id));
    }

    public addOrUpdate<T extends IDbObject>(items: T[], value: T): Observable<T> {
        if (value._id) {
            // Update
            const existingItem = items.find(item => item._id == value._id);
            if (existingItem) {
                Object.assign(existingItem, value);
                return Observable.of(existingItem);
            }

            throw `Could not find object with id: ${value._id}`;
        } else {
            // Create
            value._id = items.length + 1;
            items.push(value);
            return Observable.of(value);
        }
    }

    public update<T extends IDbObject>(items: T[], value: T): Observable<T> {

        return Observable.of(value);
    }

    public delete<T extends IDbObject>(items: T[], id: number): T[] {
        return items.filter(item => item._id !== id);
    }
}
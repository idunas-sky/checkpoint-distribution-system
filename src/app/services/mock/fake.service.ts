import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { IDbObject } from '../../models/db-object';

@Injectable()
export class FakeService {

    public get<T extends IDbObject>(items: T[], id: string): Observable<T> {
        return Observable.of(items.find(item => item.id === id));
    }

    public addOrUpdate<T extends IDbObject>(items: T[], value: T): Observable<T> {
        if (value.id) {
            // Update
            const existingItem = items.find(item => item.id == value.id);
            if (existingItem) {
                Object.assign(existingItem, value);
                return Observable.of(existingItem);
            }

            throw `Could not find object with id: ${value.id}`;
        } else {
            // Create
            value.id = this.guid();
            items.push(value);
            return Observable.of(value);
        }
    }

    public update<T extends IDbObject>(items: T[], value: T): Observable<T> {

        return Observable.of(value);
    }

    public delete<T extends IDbObject>(items: T[], id: string): T[] {
        return items.filter(item => item.id !== id);
    }

    private guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
import { Observable } from 'rxjs/Rx';

export interface IDbAccessService<T> {
    getList(): Observable<T[]>;
    get(id: string): Observable<T>;
    addOrUpdate(value: T): Observable<T>;
    delete(id: string): void;
}
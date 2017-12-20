import { DbObjectStoreInfo, DbSchema, SCHEMA } from './schema';
import { LogService } from '../log.service';
import { from } from 'rxjs/observable/from';
import { makePropDecorator } from '@angular/core/src/util/decorators';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import { observable } from 'rxjs/symbol/observable';
import { IDbObject } from '../../models/db-object';
import { Observable, Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ERROR_COLLECTOR_TOKEN } from '@angular/platform-browser-dynamic/src/compiler_factory';

@Injectable()
export class IndexedDbService {

    private _schema: DbSchema = SCHEMA;

    constructor(private _log: LogService) {
        if (!('indexedDB' in window)) {
            throw new Error('Browser does not support IndexedDB');
        }
    }

    public get<T extends IDbObject>(storeName: string, id: number): Observable<T> {
        const openRequest = this._openOrCreateDb();
        const getRequest = (db: IDBDatabase) => {
            return Observable.create((observer: Observer<any>) => {
                const that = this;
                const objStore = this._getObjectStore(db, storeName, observer, 'readonly');

                const getRequest = objStore.get(id);

                getRequest.onsuccess = function () {
                    that._log.info('[DB] Record retrieved with id: ' + id);
                    observer.next(that._mapRecord(storeName, getRequest.result));
                };

                getRequest.onerror = function (error: any) {
                    that._log.error('[DB] Error retrieving object: ' + error);
                    observer.error(error);
                }
            });
        };

        return openRequest.flatMap(getRequest);
    }

    public count(storeName: string): Observable<number> {
        const openRequest = this._openOrCreateDb();
        const countRequest = (db: IDBDatabase) => {
            return Observable.create((observer: Observer<any>) => {
                const that = this;
                const objStore = this._getObjectStore(db, storeName, observer, 'readonly');

                const innerCountRequest = objStore.count();
                innerCountRequest.onsuccess = function (event: any) {
                    const count: number = event.target.result;
                    that._log.info(`[DB] Counted ${count} records`);
                    observer.next(count);
                };

                innerCountRequest.onerror = function (error: any) {
                    that._log.error('[DB] Error while counting records: ' + error);
                    observer.error(error);
                };
            });
        };

        return openRequest.flatMap(countRequest);
    }

    public query<T extends IDbObject>(storeName: string, predicate?: (obj: T) => boolean): Observable<T[]> {
        const openRequest = this._openOrCreateDb();
        const queryRequest = (db: IDBDatabase) => {
            return Observable.create((observer: Observer<any>) => {
                const that = this;
                const result = [];
                const objStore = this._getObjectStore(db, storeName, observer, 'readonly');

                const cursorRequest = objStore.openCursor();
                cursorRequest.onsuccess = function (event: any) {
                    const cursor: IDBCursorWithValue = event.target.result;
                    if (cursor) {
                        if (predicate && !predicate(cursor.value)) {
                            // Skip this record, it doesn't match our predicate
                            that._log.info(`[DB] Skipping record '${cursor.key}', predicate doesn't match.`);
                        } else {
                            // Return this record
                            that._log.info(`[DB] Returning record '${cursor.key}'`);
                            result.push(that._mapRecord(storeName, cursor.value));
                        }

                        // Retrieve next record
                        cursor.continue();
                    } else {
                        that._log.info('[DB] Finished querying records.');
                        observer.next(result);
                    }
                };

                cursorRequest.onerror = function (error: any) {
                    that._log.error('[DB] Error while querying records: ' + error);
                    observer.error(error);
                };
            });
        };

        return openRequest.flatMap(queryRequest);
    }

    public insertOrUpdate<T extends IDbObject>(storeName: string, record: T): Observable<T> {
        const openRequest = this._openOrCreateDb();
        const insertRequest = (db: IDBDatabase) => {
            return Observable.create((observer: Observer<any>) => {
                const that = this;
                const objStore = this._getObjectStore(db, storeName, observer, 'readwrite');

                this._log.info(`[DB] ${record._id > 0 ? 'Updating' : 'Inserting'} record ...`);
                const putRequest = objStore.put(record);

                putRequest.onsuccess = function (event: any) {
                    record._id = event.target.result;
                    that._log.info(`[DB] Record '${record._id}' updated / inserted`);
                    observer.next(that._mapRecord(storeName, record));
                };

                putRequest.onerror = function (error: any) {
                    that._log.error('[DB] Error updating / inserting record: ' + error);
                    observer.error(error);
                };
            });
        };

        return openRequest.flatMap(insertRequest);
    }

    public delete(storeName: string, id: number) {
        const openRequest = this._openOrCreateDb();
        const deleteRequest = (db: IDBDatabase) => {
            return Observable.create((observer: Observer<any>) => {
                const that = this;
                const objStore = this._getObjectStore(db, storeName, observer, 'readwrite');

                this._log.info(`[DB] Deleting record '${id}'`);
                const deleteRequest = objStore.delete(id);

                deleteRequest.onsuccess = function (event: any) {
                    that._log.info(`[DB] Record '${id}' deleted`);
                }

                deleteRequest.onerror = function (error: any) {
                    that._log.error(`[DB] Error deleting record '${id}': ${error}`);
                    observer.error(error);
                }
            });
        };

        return openRequest.flatMap(deleteRequest);
    }

    private _openOrCreateDb(): Observable<IDBDatabase> {
        return Observable.create((observer: Observer<any>) => {
            const that = this;

            // Create or open the database
            const openRequest = window.indexedDB.open(this._schema.name, this._schema.version);

            // Return the database object if opening it was successful
            openRequest.onsuccess = function (event: any) {
                that._log.info(`[DB] Connection established to '${that._schema.name}'`)
                observer.next(openRequest.result);
                observer.complete();
            };

            // Handle all errors
            openRequest.onerror = function (error: any) {
                that._log.error('[DB] Connection error: ' + error)
                observer.error(error);
            };

            // Handle database-upgrades
            openRequest.onupgradeneeded = function (event: any) {
                that._log.info("[DB] DB-Upgrade needed");
                that._upgradeDatabase(observer, event.target.result);
            };

            // Handle the case where the database can't be upgraded because
            // the database is currently in use
            openRequest.onblocked = function (event: any) {
                that._log.info("[DB] DB-Upgrade blocked");
            };
        });
    }

    private _getObjectStore(db: IDBDatabase, storeName: string, observer: Observer<any>, mode: IDBTransactionMode): IDBObjectStore {
        const that = this;

        // Create a transaction for accessing the database
        this._log.info('[DB] Creating transaction')
        const transaction = db.transaction(storeName, mode);

        // Access the corresponding object-store
        this._log.info('[DB] Connecting to object-store: ' + storeName);
        const objStore = transaction.objectStore(storeName);

        // If the transaction completes we close the observer
        transaction.oncomplete = function () {
            that._log.info("[DB] Transaction completed");
            observer.complete();
        }

        transaction.onerror = function (error: any) {
            that._log.error('[DB] Transaction error: ' + error)
            observer.error(error);
        }

        return objStore;
    }

    private _upgradeDatabase(observer: Observer<IDBDatabase>, db: IDBDatabase) {
        this._log.info(`[DB] Upgrading database ...`);
        for (const storeInfo of this._schema.stores) {
            if (!db.objectStoreNames.contains(storeInfo.name)) {
                this._log.info(`[DB] Creating object-store '${storeInfo.name}'`);
                this._createObjectStore(db, storeInfo, '_id');
            }
            else {
                this._log.info(`[DB] Skipping creation of object-store '${storeInfo.name}', does already exist`);
            }
        }
    }

    private _createObjectStore(db: IDBDatabase, storeInfo: DbObjectStoreInfo, primaryKey: string) {
        db.createObjectStore(storeInfo.name, { autoIncrement: storeInfo.autoIncrement, keyPath: primaryKey });
    }

    private _mapRecord(storeName: string, record: IDbObject): IDbObject {
        const storeDefinition = this._schema.stores.find(store => store.name == store.name);
        if (!storeDefinition || !storeDefinition.mappingFunc) {
            return record;
        }

        return storeDefinition.mappingFunc(record);
    }
}
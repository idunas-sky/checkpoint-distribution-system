import { Observable } from 'rxjs/Rx';
import { IDbAccessService } from './db.interface.service';
import { Injectable } from '@angular/core';
import { CheckpointLocation } from '../models/checkpoint-location';

export abstract class DbCheckpointLocationService implements IDbAccessService<CheckpointLocation> {
    public abstract getList(): Observable<CheckpointLocation[]>;
    public abstract get(id: string): Observable<CheckpointLocation>;
    public abstract addOrUpdate(value: CheckpointLocation): Observable<CheckpointLocation>;
    public abstract delete(id: string): void;
}
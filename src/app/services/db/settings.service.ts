import { Observable } from 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { IndexedDbService } from "./indexed-db.service";
import { Settings } from "../../models/settings";
import { StoreNames } from './schema';

const GLOBAL_SETTING_ID = 1;

@Injectable()
export class SettingsService {

    constructor(private _db: IndexedDbService) {

    }

    public loadSettings(): Observable<Settings> {
        return this._db.get(StoreNames.Settings, GLOBAL_SETTING_ID);
    }

    public saveSettings(settings: Settings): Observable<Settings> {
        settings._id = GLOBAL_SETTING_ID;
        return this._db.insertOrUpdate(StoreNames.Settings, settings);
    }
}
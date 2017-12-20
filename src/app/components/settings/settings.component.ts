import { Settings } from '../../models/settings';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { SettingsService } from '../../services/db/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public form: FormGroup;
    private _settings: Settings;

    constructor(
        private _formBuilder: FormBuilder,
        private _db: SettingsService) {

        this.form = this._formBuilder.group({
            mapUrl: [''],
            mapAccessToken: ['']
        });
    }

    ngOnInit() {
        this._db.loadSettings().subscribe(settings => {
            if (settings === undefined) {
                settings = new Settings();
            }
            this._settings = settings
            this.form.patchValue(this._settings);
        });
    }

    public save() {
        this._settings = Object.assign(this._settings, this.form.value);
        this._db.saveSettings(this._settings).subscribe(_ => {

        });
    }
}

import { CheckpointLocationService } from '../../../services/db/checkpoint-location.services';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CheckpointLocation } from '../../../models/checkpoint-location';

@Component({
    selector: 'app-checkpoint-location-details',
    templateUrl: './checkpoint-location-details.component.html',
    styleUrls: ['./checkpoint-location-details.component.scss']
})
export class CheckpointLocationDetailsComponent implements OnInit {

    private _location: CheckpointLocation;
    public form: FormGroup;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _db: CheckpointLocationService,
        private _formBuilder: FormBuilder) {
        this.createForm();
    }

    private createForm() {
        this.form = this._formBuilder.group({
            _id: new FormControl({ value: '', disabled: true }),
            name: ['', Validators.required],
            remarks: ''
        })
    }

    public ngOnInit() {
        this._route.paramMap.subscribe(map => {
            const id = +map.get('id');

            if (id) {
                // Edit location
                this._db.get(id).subscribe(location => {
                    this._location = location;
                    this.form.patchValue(this._location);
                });
            } else {
                // New location
                this._location = new CheckpointLocation();
                this.form.reset(this._location);
            }
        })
    }

    public save() {
        this._location = Object.assign(this._location, this.form.value);
        this._db.addOrUpdate(this._location).subscribe( _ => {
            this._router.navigate(['/locations']);
        });
    }
}

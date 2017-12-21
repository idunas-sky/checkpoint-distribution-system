import { MapComponent } from '../../map/map.component';
import { CheckpointLocationService } from '../../../services/db/checkpoint-location.services';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CheckpointLocation } from '../../../models/checkpoint-location';
import { MapClickEventArgs } from "../../map/map-click.event-args";
import { GeoLocation } from "../../../models/geo-location";

@Component({
    selector: 'app-checkpoint-location-details',
    templateUrl: './checkpoint-location-details.component.html',
    styleUrls: ['./checkpoint-location-details.component.scss']
})
export class CheckpointLocationDetailsComponent implements OnInit, AfterViewInit {

    public location: CheckpointLocation;
    public form: FormGroup;
    @ViewChild('map') private _map: MapComponent;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _db: CheckpointLocationService,
        private _formBuilder: FormBuilder) {
        this.createForm();
    }

    private createForm() {
        this.form = this._formBuilder.group({
            _id: new FormControl({ value: '', disabled: true }),
            name: ['', Validators.required],
            location: this._formBuilder.group({
                latitude: '',
                longitude: ''
            }),
            remarks: ''
        })
    }

    public ngOnInit() {

    }

    public ngAfterViewInit(): void {
        this._route.paramMap.subscribe(map => {
            const id = +map.get('id');

            if (id) {
                // Edit location
                this._db.get(id).subscribe(location => {
                    this.location = location;
                    this.form.patchValue(this.location);
                    this._map.setMarker(location.location);
                    this._map.setViewLocation(location.location, 16);
                });
            } else {
                // New location
                this.location = new CheckpointLocation();
                this.form.reset(this.location);
            }
        });
    }

    public onMapClick(args: MapClickEventArgs) {
        this.location.location = new GeoLocation(args.latitude, args.longitude);
        this.form.patchValue(this.location);
        this.form.controls['location'].markAsDirty();
    }

    public save() {
        this.location = Object.assign(this.location, this.form.value);
        this._db.addOrUpdate(this.location).subscribe(_ => {
            this._router.navigate(['/locations']);
        });
    }
}

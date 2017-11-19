import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DbCheckpointLocationService } from '../../../services/db-checkpoint-location.service';
import { CheckpointLocation } from '../../../models/checkpoint-location';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FakeCheckpointLocationService } from '../../../services/mock/fake-checkpoint-location.service';
import { DataGridColumn, DataGridConfguration } from '../../data-grid/data-grid-configuration';

@Component({
    selector: 'app-checkpoint-location-list',
    templateUrl: './checkpoint-location-list.component.html',
    styleUrls: ['./checkpoint-location-list.component.scss']
})
export class CheckpointLocationListComponent implements OnInit {

    public gridConfiguration = new DataGridConfguration<CheckpointLocation>({
        columns: [
            new DataGridColumn('name', 'Name'),
            new DataGridColumn('remarks', 'Bemerkungen')
        ],
        titleProperty: 'name',
        filterFunc: (dataSource, filter) => {
            return dataSource.filter(item => item.name.toLowerCase().indexOf(filter) >= 0);
        },
        editFunc: element => this._router.navigate(['/locations/details', element.id]),
        deleteFunc: element => this._db.delete(element.id)
    });

    public locations: CheckpointLocation[] = [];

    constructor(
        private _db: DbCheckpointLocationService,
        private _router: Router) {
    }

    public ngOnInit() {
        this.loadData();
    }

    private loadData(filter?: string) {
        this._db.getList().subscribe(values => this.locations = values);
    }
}

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
        filterFunc: (dataSource, filter) => {
            return dataSource.filter(item => item.name.toLowerCase().indexOf(filter) >= 0);
        }
    });

    public locations: CheckpointLocation[] = [];

    constructor(private _db: DbCheckpointLocationService) {
    }

    public ngOnInit() {
        this.loadData();
    }

    public delete(element: CheckpointLocation) {
        // let dialogRef = this._dialog.open(DeleteDialogComponent, {
        //   width: '250px',
        //   data: { id: element.id, name: element.name, delete: false }
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //   if (result) {
        //     this._db.delete(result);
        //     this._dataSource = this._dataSource.filter(item => item.id !== result);
        //     this.dataSource.data = this._dataSource;
        //   }
        // });
    }

    private loadData(filter?: string) {
        this._db.getList().subscribe(values => this.locations = values);
    }
}

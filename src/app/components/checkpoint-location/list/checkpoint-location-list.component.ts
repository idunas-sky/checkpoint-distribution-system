import { DbCheckpointLocationService } from '../../../services/db-checkpoint-location.service';
import { CheckpointLocation } from '../../../models/checkpoint-location';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FakeCheckpointLocationService } from '../../../services/mock/fake-checkpoint-location.service';

@Component({
  selector: 'app-checkpoint-location-list',
  templateUrl: './checkpoint-location-list.component.html',
  styleUrls: ['./checkpoint-location-list.component.scss']
})
export class CheckpointLocationListComponent implements OnInit {

  public locations: CheckpointLocation[] = [];

  constructor(
    private _db: DbCheckpointLocationService,
  ) { }

  public ngOnInit() {
    this.loadData();
  }

  public applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
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

  private loadData() {
    this._db.getList().subscribe(values => this.locations = values);
  }
}

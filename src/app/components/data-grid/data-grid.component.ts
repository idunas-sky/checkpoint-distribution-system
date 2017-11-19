import { componentFactoryResolverProviderDef } from '@angular/compiler/src/view_compiler/provider_compiler';
import { Observable, Observer } from 'rxjs/Rx';
import { DataGridConfguration } from './data-grid-configuration';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { CheckpointLocation } from '../../models/checkpoint-location';

@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements AfterViewInit, OnChanges {

    public filterValue: string;
    public filteredDataSource: any[] = [];
    public elementToDelete: any;

    @Input() configuration: DataGridConfguration<any>
    @Input() dataSource: any[];
    @Input() filterDelay: number = 300;

    @ViewChild('filter') filterRef: ElementRef;

    constructor() { }

    public ngAfterViewInit() {
        const filterEventStream = Observable.fromEvent(this.filterRef.nativeElement, 'input')
            .debounceTime(this.filterDelay)
            .distinctUntilChanged()
            .subscribe(_ => this.filteredDataSource = this.getFilteredDatasource(this.filterValue));
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.dataSource) {
            this.filteredDataSource = this.getFilteredDatasource(this.filterValue);
        }
    }

    public getFilteredDatasource(value: string): any[] {
        if (!value) {
            return this.dataSource;
        }

        return this.configuration.filterFunc(this.dataSource, value.toLowerCase());
    }

    public edit(element: any) {
        this.configuration.editFunc(element);
    }

    public showDeleteDialog(element: any) {
        this.elementToDelete = element;
    }

    public delete(element: any) {
        // Reset the delete element
        this.elementToDelete = null;

        // Remove from our local data-set
        const index = this.dataSource.indexOf(element);
        if (index >= 0) {
            this.dataSource.splice(index, 1);
        }

        this.filteredDataSource = this.getFilteredDatasource(this.filterValue);

        // Tell our parent component to remove it 
        this.configuration.deleteFunc(element);
    }
}

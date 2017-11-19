import { componentFactoryResolverProviderDef } from '@angular/compiler/src/view_compiler/provider_compiler';
import { Observable, Observer } from 'rxjs/Rx';
import { DataGridConfguration } from './data-grid-configuration';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements AfterViewInit, OnChanges {

    public filterValue: string;
    public filteredDataSource: any[] = [];

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
}

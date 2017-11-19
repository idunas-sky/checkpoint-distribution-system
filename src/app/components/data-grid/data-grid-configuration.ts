import { NgControlStatusGroup } from '@angular/forms';
export class DataGridConfguration<T> {
    public columns: DataGridColumn[];
    public titleProperty: string;
    public filterFunc: (dataSource: T[], filterValue: string) => T[];
    public editFunc: (value: T) => void;
    public deleteFunc: (value: T) => void;

    constructor(init?: Partial<DataGridConfguration<T>>) {
        this.columns = [];
        Object.assign(this, init);
    }
}

export class DataGridColumn {
    constructor(
        public property: string,
        public title: string
    ) { }
}
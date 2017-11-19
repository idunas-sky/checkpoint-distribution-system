import { NgControlStatusGroup } from '@angular/forms';
export class DataGridConfguration<T> {
    public columns: DataGridColumn[];
    public filterFunc: (dataSource: T[], filterValue: string) => T[];

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
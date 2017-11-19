import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    @Input() title: string;
    @Input() isOpen: boolean = false;
    @Output() closed = new EventEmitter();

    constructor() {
    }

    public closeDialog(): void {
        this.isOpen = false;

        // Compensate for the transition delay
        setTimeout(() => {
            this.closed.emit();
        }, 300);
    }
}
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    Renderer,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
};

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {

    private _innerValue: any = "";
    private _isDisabled: boolean;

    public errors: any[] = [];

    public get value(): any {
        return this._innerValue;
    }

    public set value(value: any) {
        if (value !== this._innerValue) {
            this._innerValue = value;
            this.propagateChange(this._innerValue);
        }
    }

    @Input() type: string;
    @Input() id: string;
    @Input() label: string;
    @Input() placeholder: string;

    @Output() input: EventEmitter<any> = new EventEmitter<any>();
    // @Input() control: FormControl = new FormControl();

    @ViewChild('input') inputRef: ElementRef;
    @ViewChild('textarea') textareaRef: ElementRef;

    constructor(private _renderer: Renderer) { }

    public ngAfterViewInit() {

        // Set the initial enabled / disabled state
        this.setDisabledState(this._isDisabled);

        // this.inputRef.nativeElement
        // this.control.valueChanges.subscribe(() => {
        //     if (this.control.value == "" || this.control.value == null || this.control.value == undefined) {
        //         this._innerValue = "";
        //         this.inputRef.nativeElement.value = "";
        //     }
        // });
    }

    public onChange(e: Event, value: any) {
        // Set changed value
        this.value = value;

        // this.input.emit(value);

        // // Reset errors
        // this.errors = [];
        // for (const key in this.control.errors) {
        //     if (this.control.errors.hasOwnProperty(key)) {
        //         this.errors.push(this.control.errors[key]);
        //     }
        // }
    }

    public propagateChange = (_: any) => { };

    public writeValue(value: any) {
        this._innerValue = value;
    }

    public registerOnChange(func: any) {
        this.propagateChange = func;
    }

    public registerOnTouched(func: any) {
    }

    public setDisabledState(isDisabled: boolean) {

        // Store the state in our local variable. If the view is not initialized right now
        // the after-init callback will take care of disabling / enabling the component
        this._isDisabled = isDisabled;

        if (this.inputRef) {
            this._renderer.setElementProperty(this.inputRef.nativeElement, 'disabled', isDisabled);
        }
    }
}

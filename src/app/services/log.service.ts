import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

    constructor() { }

    public info(message: string) {
        console.log(message);
    }

    public warn(message: string) {
        console.log(message);
    }

    public error(message: string) {
        console.log(message);
    }
}
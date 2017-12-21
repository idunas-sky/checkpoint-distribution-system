import {DbObject} from "./db-object";

export class Settings extends DbObject {
    mapUrl: string;
    mapAccessToken: string;
}
import {IDbObject} from "./db-object";

export class Settings implements IDbObject {
    _id: number;
    mapUrl: string;
    mapAccessToken: string;
}
import { BaseEntity } from './../../shared';

export class Announcement implements BaseEntity {
    public id?: string;
    public title?: string;
    public body?: string;
    public date?: Date;
    constructor(
        id?: string,
        title?: string,
        body?: string,
        date?: Date
    ) {
    }
}

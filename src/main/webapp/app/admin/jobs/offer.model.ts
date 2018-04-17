import { BaseEntity } from './../../shared';

export class Offer implements BaseEntity {
    public id?: string;
    public company?: string;
    public dateOfVisit?: Date;
    public lastDate?: Date;
    public course?: string;
    public cgpa?: string;
    constructor(
        id?: string,
        company?: string,
        dateOfVisit?: Date,
        lastDate?: Date,
        course?: string,
        cgpa?: string
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class Offer implements BaseEntity {
    constructor(
        public id?: string,
        public title?: string,
        public packageOffered?: number,
        public discreption?: string,
        public dateOfVisit?: any,
        public lastDate?: any,
        public place?: string,
    ) {
    }
}

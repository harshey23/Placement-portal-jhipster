import { BaseEntity } from './../../shared';

export class Applicant implements BaseEntity {
    constructor(
        public id?: string,
        public myid?: string,
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class Company implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public website?: string,
        public description?: string,
        public person1?: string,
        public contact1?: string,
        public email1?: string,
        public person2?: string,
        public contact2?: string,
        public email2?: string,
    ) {
    }
}

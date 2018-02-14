import { BaseEntity } from './../../shared';

export class Company implements BaseEntity {
constructor(
        public id?: string,
        public name?: string,
        public website?: string,
        public description?: string,
        public phone?: string,
        public email?: string,
    ) {
    }
}

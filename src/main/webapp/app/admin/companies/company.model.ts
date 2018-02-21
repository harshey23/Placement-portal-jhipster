import { BaseEntity } from './../../shared';

export class Company implements BaseEntity {

constructor(
        public id?: any,
        public name?: any,
        public website?: any,
        public description?: any,
        public phone?: any,
        public email?: any,
    ) {
    }
}

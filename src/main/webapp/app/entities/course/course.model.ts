import { BaseEntity } from './../../shared';

export class Course implements BaseEntity {
    constructor(
        public id?: string,
        public course?: string,
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class Announcement implements BaseEntity {
    constructor(
        public id?: string,
        public title?: string,
        public body?: string,
        public date?: any,
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class Batch implements BaseEntity {
    constructor(
        public id?: string,
        public batch?: string,
    ) {
    }
}

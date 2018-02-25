import { BaseEntity } from './../../shared';

export class Round implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public number?: number,
        public description?: string,
        public date?: any,
    ) {
    }
}

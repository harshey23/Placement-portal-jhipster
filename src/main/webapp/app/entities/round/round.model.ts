import { BaseEntity } from './../../shared';

export class Round implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public number?: number,
        public discreption?: string,
        public date?: any,
    ) {
    }
}

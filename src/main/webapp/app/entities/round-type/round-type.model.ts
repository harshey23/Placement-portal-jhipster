import { BaseEntity } from './../../shared';

export class RoundType implements BaseEntity {
    constructor(
        public id?: string,
        public roundType?: string,
    ) {
    }
}

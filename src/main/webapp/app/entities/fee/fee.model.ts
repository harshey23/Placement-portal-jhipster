import { BaseEntity } from './../../shared';

export class Fee implements BaseEntity {
    constructor(
        public id?: string,
        public receiptNumber?: number,
        public amount?: number,
    ) {
    }
}

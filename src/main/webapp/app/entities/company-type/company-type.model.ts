import { BaseEntity } from './../../shared';

export class CompanyType implements BaseEntity {
    constructor(
        public id?: string,
        public companyType?: string,
    ) {
    }
}

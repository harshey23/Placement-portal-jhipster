import { BaseEntity } from './../../shared';

export class Mytry implements BaseEntity {
    constructor(
        public id?: string,
        public s?: string,
        public i?: number,
        public l?: number,
        public f?: number,
        public d?: number,
        public bd?: number,
        public ld?: any,
        public inst?: any,
        public zdt?: any,
        public b?: boolean,
        public blContentType?: string,
        public bl?: any,
    ) {
        this.b = false;
    }
}

import { BaseEntity } from './../../shared';

export class Academic implements BaseEntity {
    constructor(
        public id?: string,
        public xBoard?: string,
        public xPercentage?: string,
        public xYearOfPass?: string,
        public xiiBoard?: string,
        public xiiPercentage?: string,
        public xiiYearOfPass?: string,
        public dipPercentage?: string,
        public dipYearOfPass?: string,
        public cetRank?: number,
        public comedkRank?: number,
        public iSem?: number,
        public iiSem?: number,
        public iiiSem?: number,
        public ivSem?: number,
        public vSem?: number,
        public viSem?: number,
        public viiSem?: number,
        public viiiSem?: number,
        public ixSem?: number,
        public xSem?: number,
        public cgpa?: number,
        public discontinued?: boolean,
        public yearBack?: boolean,
        public currentBackLog?: number,
        public historyBackLog?: number,
    ) {
        this.discontinued = false;
        this.yearBack = false;
    }
}

import { BaseEntity } from './../../shared';

export class Mocktest implements BaseEntity {

   constructor(public id?: string,
                public name?: string,
                public questions?: Questions,
                public answers?: any[]) {}
}
class Questions {
    constructor(public _id: string,
                 public question: string,
                 public opt1: string,
                 public opt2: string,
                 public opt3: string,
                 public opt4: string,
                 public answer: string) {}
}

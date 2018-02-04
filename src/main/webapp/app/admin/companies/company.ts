export class Company {
  constructor(
    public id: number,
    public name: string,
    // public contact: Contact[],
    public contact: string,
    public number: number,
    public email: string,
    public address: string,
    public website: string,
    public description: string,
    public type: string,
    public status: string,
  ){}
  }

  export class Contact {
    constructor(
    name: string,
    number: number,
    email: string,
  ){}
  }
  
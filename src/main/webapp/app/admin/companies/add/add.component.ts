import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Company } from '../company.model';
import { CompanyService } from '../company.services';

@Component({
  selector: 'app-company-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  types = ["It Services", "IT core", "Non-IT core"];
  status = ['Active', 'Inactive', 'Obsolete'];

  // model= new Company();
  companyForm: FormGroup;
  company: Company;
  // dummy: Company;
  // contact: Contact;
  // contacts: Contact[];
  ccompany: Company;

  constructor(
    private companyService: CompanyService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required ],
      // contact: this.fb.group({
      //   name: '',
      //   number: '',
      //   email: ''
      // }),
      contact: '',
      number: '',
      email: '',
      address: '',
      website: '',
      description: '',
      type: '',
      status: ''
    });
  }

  onSubmit() {
    this.companyService.create(this.companyForm.getRawValue())
      .subscribe(ccompany => this.ccompany = ccompany);
    this.goBack();
    alert("Company added");


    // console.log(this.companyForm);

    // this.contact = new Contact(
    //   this.companyForm.get('contact.name').value,
    //   this.companyForm.get('contact.number').value,
    //   this.companyForm.get('contact.email').value)

    // this.contacts = [this.contact]

    // this.dummy = new Company(7,
    //   this.companyForm.get('name').value,
    //   this.contacts,
    //   this.companyForm.get('address').value,
    //   this.companyForm.get('website').value,
    //   this.companyForm.get('description').value,
    //   this.companyForm.get('type').value,
    //   this.companyForm.get('status').value,
    // );

    // // this.company.name = this.companyForm.get('name').value;
    // // this.company.contact = [this.companyForm.get('contact.name').value, this.companyForm.get('contact.number').value, this.companyForm.get('contact.email').value, ];
    // // this.company.contact[0].name = this.companyForm.get('contact.name').value;
    // // this.company.contact[0].number = this.companyForm.get('contact.number').value;
    // // this.company.contact[0].email = this.companyForm.get('contact.email').value;
    // // this.company.address = this.companyForm.get('address').value;
    // // this.company.website = this.companyForm.get('website').value;
    // // this.company.description = this.companyForm.get('description').value;
    // // this.company.type = this.companyForm.get('type').value;
    // // this.company.status = this.companyForm.get('status').value;
    // console.log(this.dummy);

    // this.companyService.addCompany(this.company)
    //   .subscribe(ccompany => this.ccompany = ccompany);
    // this.goBack();
    // alert("Company added");
  }

  goBack(): void {
    this.location.back();
  }

}

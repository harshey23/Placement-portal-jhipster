import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CompanyService } from '../company.services';

declare var $: any;

@Component({
  selector: 'app-company-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  statusItem: any[] = [
    { status: 'Active', class: 'nav nav-pills nav-justified nav-pills-success' },
    { status: 'Inactive', class: 'nav nav-pills nav-justified nav-pills-warning' },
    { status: 'Obsolete', class: 'nav nav-pills nav justified nav-pills-danger' }
  ]

    companies: any[] = [
    {name: 'TCS',number: '9874563211'},{name: 'TCS',number: '9874563211'}
    ]

  constructor(
   // private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  gotoDetail(id: number): void {
    console.log(id);
    this.router.navigate(['/admin/companies/detail', id]);
  }

  addCompany(): void {
    this.router.navigate(['/admin/companies/add']);
  }

}

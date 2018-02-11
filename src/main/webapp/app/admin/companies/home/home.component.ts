import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../company.model';
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

  companies: Company[];
  selectedCompany: Company;

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) { }

  getCompanies(): void {
    this.companyService.getCompanies()
      .subscribe(companies => this.companies = companies);
    // .then(companies => this.companies = companies);
  }

  ngOnInit() {
    this.getCompanies();
    $('[data-toggle="tooltip"]').tooltip();
  }

  gotoDetail(id: number): void {
    console.log(id);
    this.router.navigate(['/admin/companies/detail', id]);
  }

  addCompany(): void {
    this.router.navigate(['/admin/companies/add']);
  }

}

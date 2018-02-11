import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Company } from '../company';
import { CompanyService } from '../company.services';

@Component({
  selector: 'app-company-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() company: Company;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCompany();
  }

  getCompany(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.companyService.getCompany(id)
      .subscribe(company => this.company = company);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.companyService.updateCompany(this.company)
      .subscribe(() => this.goBack());
  }
}

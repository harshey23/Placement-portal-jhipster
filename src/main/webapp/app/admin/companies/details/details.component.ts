import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CompanyService } from '../company.services';

@Component({
  selector: 'app-company-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private location: Location
  ) { }

  ngOnInit() {

  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

  }
}

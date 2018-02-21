import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';
import { Location } from '@angular/common';

import { Company } from '../company.model';
import { CompanyService } from '../company.services';

@Component({
  selector: 'jhi-company-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  company: Company;
  private subscription: Subscription;
  private eventSubscriber: Subscription;

  constructor(
      private eventManager: JhiEventManager,
      private companyService: CompanyService,
      private route: ActivatedRoute,
      private location: Location
  ) {
  }

  ngOnInit() {
      this.subscription = this.route.params.subscribe((params) => {
          this.load(params['id']);
      });
      this.registerChangeInCompanies();
  }

  load(id) {
      this.companyService.find(id).subscribe((company) => {
          this.company = company;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.eventManager.destroy(this.eventSubscriber);
}

registerChangeInCompanies() {
    this.eventSubscriber = this.eventManager.subscribe(
        'companyListModification',
        (response) => this.load(this.company.id)
    );
}
  goBack(): void {
    this.location.back();
  }

 
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { OfferService } from '../../admin/jobs/offer.service';
import { Offer } from '../../admin/jobs/offer.model';

@Component({
  selector: 'jhi-student-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentAccount: any;
  offers: Offer[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    private offerService: OfferService,
    private parseLinks: JhiParseLinks,
    private jhiAlertService: JhiAlertService,
    private principal: Principal,
    private router: Router,
    private eventManager: JhiEventManager
  ) {

    this.itemsPerPage = ITEMS_PER_PAGE;
  }
  loadAll() {
    this.offerService.query({
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    }).subscribe(
      (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
      (res: ResponseWrapper) => this.onError(res.json)
    );
  }
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/dashboard'], {
      queryParams:
        {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate(['/dashboard', {
      page: this.page,
      sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
    }]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then((account) => {
      this.currentAccount = account;
    });
    this.registerChangeInOffer();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: Offer) {
    return item.company;
  }

  registerChangeInOffer() {
    this.eventSubscriber = this.eventManager.subscribe('offerListModification', (response) => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(data, headers) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    // this.page = pagingParams.page;
    this.offers = data;
  }

  private onError(error) {
    this.jhiAlertService.error(error.message, null, null);
  }

}

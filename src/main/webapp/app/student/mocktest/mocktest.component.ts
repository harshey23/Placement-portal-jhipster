import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { MocktestService} from './mocktest.service';
import { Mocktest} from './mocktest.model';

@Component({
  selector: 'jhi-student-mocktest',
  templateUrl: './mocktest.component.html',
  styleUrls: ['./mocktest.component.scss']
})
export class MocktestComponent implements OnInit, OnDestroy {

  currentAccount: any;
  mocktests: Mocktest[];
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
  private mocktestService: MocktestService,
  private parseLinks: JhiParseLinks,
  private jhiAlertService: JhiAlertService,
  private principal: Principal,
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private eventManager: JhiEventManager
) {

  this.itemsPerPage = ITEMS_PER_PAGE;
  this.routeData = this.activatedRoute.data.subscribe((data) => {
   //   this.page = data.pagingParams.page;
    //  this.previousPage = data.pagingParams.page;
    //  this.reverse = data.pagingParams.ascending;
    //  this.predicate = data.pagingParams.predicate;
  });
}
loadAll() {
  this.mocktestService.query({
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
  this.router.navigate(['/mocktest'], {
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
  this.router.navigate(['/mocktest', {
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
  this.registerChangeInMocktest();
}

ngOnDestroy() {
  this.eventManager.destroy(this.eventSubscriber);
}

trackId(index: number, item: Mocktest) {
  return item.name;
}

registerChangeInMocktest() {
  this.eventSubscriber = this.eventManager.subscribe('mocktestListModification', (response) => this.loadAll());
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
  this.mocktests = data;
}

private onError(error) {
  console.log('error');
 // this.jhiAlertService.error(error.any, null, null);
}

gotoDetail(id: any): void {
  console.log(id);
  this.router.navigate(['/student/mocktest/view', id]);
}

}

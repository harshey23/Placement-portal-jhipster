import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { AnnouncementService } from '../../admin/announcements/announcements.service';
import { Announcement } from '../../admin/announcements/announcement.model';
@Component({
  selector: 'jhi-student-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit, OnDestroy {

  currentAccount: any;
  announcements: Announcement[];
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
  private announcementService: AnnouncementService,
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
  this.announcementService.query({
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
  this.router.navigate(['/notice'], {
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
  this.router.navigate(['/notice', {
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
  this.registerChangeInAnnouncement();
}

ngOnDestroy() {
  this.eventManager.destroy(this.eventSubscriber);
}

trackId(index: number, item: Announcement) {
  return item.title;
}

registerChangeInAnnouncement() {
  this.eventSubscriber = this.eventManager.subscribe('announcementListModification', (response) => this.loadAll());
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
  this.announcements = data;
}

private onError(error) {
  this.jhiAlertService.error(error.message, null, null);
}

gotoDetail(id: any): void {
  console.log(id);
  this.router.navigate(['/student/notice/view', id]);
}

}

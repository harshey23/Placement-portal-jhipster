import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Company } from '../company.model';
import { CompanyService } from '../company.services';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

@Component({
  selector: 'jhi-company-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    
        companies: Company[];
        currentAccount: any;
        eventSubscriber: Subscription;
        itemsPerPage: number;
        links: any;
        page: any;
        predicate: any;
        queryCount: any;
        reverse: any;
        totalItems: number;

        statusItem: any[] = [
          { status: 'Active', class: 'nav nav-pills nav-justified nav-pills-success' },
          { status: 'Inactive', class: 'nav nav-pills nav-justified nav-pills-warning' },
          { status: 'Obsolete', class: 'nav nav-pills nav justified nav-pills-danger' }
        ]

        constructor(
            private companyService: CompanyService,
            private jhiAlertService: JhiAlertService,
            private eventManager: JhiEventManager,
            private parseLinks: JhiParseLinks,
            private principal: Principal,
            private router: Router
        ) {
            this.companies = [];
            this.itemsPerPage = ITEMS_PER_PAGE;
            this.page = 0;
            this.links = {
                last: 0
            };
            this.predicate = 'id';
            this.reverse = true;
        }
 loadAll() {
        this.companyService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    reset() {
        this.page = 0;
        this.companies = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCompanies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Company) {
        return item.id;
    }
    registerChangeInCompanies() {
        this.eventSubscriber = this.eventManager.subscribe('companyListModification', (response) => this.reset());
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
        for (let i = 0; i < data.length; i++) {
            this.companies.push(data[i]);
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

  gotoDetail(id: number): void {
    console.log(id);
    this.router.navigate(['/admin/companies/detail', id]);
  }

  addCompany(): void {
    this.router.navigate(['/admin/companies/add']);
  }

}

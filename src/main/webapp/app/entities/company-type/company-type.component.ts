import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CompanyType } from './company-type.model';
import { CompanyTypeService } from './company-type.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-company-type',
    templateUrl: './company-type.component.html'
})
export class CompanyTypeComponent implements OnInit, OnDestroy {
companyTypes: CompanyType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private companyTypeService: CompanyTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.companyTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.companyTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCompanyTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CompanyType) {
        return item.id;
    }
    registerChangeInCompanyTypes() {
        this.eventSubscriber = this.eventManager.subscribe('companyTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

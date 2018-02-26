import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CompanyType } from './company-type.model';
import { CompanyTypeService } from './company-type.service';

@Component({
    selector: 'jhi-company-type-detail',
    templateUrl: './company-type-detail.component.html'
})
export class CompanyTypeDetailComponent implements OnInit, OnDestroy {

    companyType: CompanyType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private companyTypeService: CompanyTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCompanyTypes();
    }

    load(id) {
        this.companyTypeService.find(id).subscribe((companyType) => {
            this.companyType = companyType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCompanyTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'companyTypeListModification',
            (response) => this.load(this.companyType.companyType)
        );
    }
}

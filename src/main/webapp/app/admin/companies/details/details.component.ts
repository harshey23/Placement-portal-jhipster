import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Company } from '../company.model';
import { CompanyService } from '../company.services';

@Component({
    selector: 'jhi-company-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

    company: Company;
    isSaving: boolean;
    routeSub: any;

    constructor(
        public location: Location,
        private companyService: CompanyService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.companyService.find(params['id']).subscribe((company) => {
                    this.company = company;
                });
            }
        });
    }

    save() {
        this.isSaving = true;
        console.log(this.company);
        this.subscribeToSaveResponse(this.companyService.update(this.company));
    }

    goBack(): void {
        this.location.back();
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    private subscribeToSaveResponse(result: Observable<Company>) {
        result.subscribe((res: Company) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Company) {
        this.eventManager.broadcast({ name: 'companyListModification', content: 'OK' });
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

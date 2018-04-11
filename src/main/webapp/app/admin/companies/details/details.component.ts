import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Company } from '../company.model';
import { CompanyType } from '../company-type.model';
import { CompanyService } from '../company.services';
import { CompanyTypeService } from '../company-type.service';
import { ResponseWrapper } from '../../../shared';

@Component({
    selector: 'jhi-company-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

    company: Company;
    companyTypes: CompanyType[];
    isSaving: boolean;
    routeSub: any;

    constructor(
        public location: Location,
        private companyService: CompanyService,
        private companyTypeService: CompanyTypeService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.company = new Company();
        this.companyTypeService.query().subscribe((res: ResponseWrapper) => this.companyTypes = res.json);
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.companyService.find(params['id']).subscribe((company) => {
                    this.company = company;
                    console.log('detail called ', this.company);
                });
                console.log('after', this.company);
            }
        });
    }

    save() {
        this.isSaving = true;
        console.log(this.company);
        this.subscribeToSaveResponse(this.companyService.update(this.company));
        this.goBack();
    }

    delete(): void {
        this.companyService.delete(this.company.name).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'companyListModification',
                content: 'Deleted an company'
            });
            this.goBack();
        });
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

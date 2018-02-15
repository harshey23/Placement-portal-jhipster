import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CompanyType } from './company-type.model';
import { CompanyTypePopupService } from './company-type-popup.service';
import { CompanyTypeService } from './company-type.service';

@Component({
    selector: 'jhi-company-type-dialog',
    templateUrl: './company-type-dialog.component.html'
})
export class CompanyTypeDialogComponent implements OnInit {

    companyType: CompanyType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private companyTypeService: CompanyTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.companyType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.companyTypeService.update(this.companyType));
        } else {
            this.subscribeToSaveResponse(
                this.companyTypeService.create(this.companyType));
        }
    }

    private subscribeToSaveResponse(result: Observable<CompanyType>) {
        result.subscribe((res: CompanyType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CompanyType) {
        this.eventManager.broadcast({ name: 'companyTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-company-type-popup',
    template: ''
})
export class CompanyTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private companyTypePopupService: CompanyTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.companyTypePopupService
                    .open(CompanyTypeDialogComponent as Component, params['id']);
            } else {
                this.companyTypePopupService
                    .open(CompanyTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

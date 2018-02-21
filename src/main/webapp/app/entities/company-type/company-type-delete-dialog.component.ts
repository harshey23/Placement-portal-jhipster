import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CompanyType } from './company-type.model';
import { CompanyTypePopupService } from './company-type-popup.service';
import { CompanyTypeService } from './company-type.service';

@Component({
    selector: 'jhi-company-type-delete-dialog',
    templateUrl: './company-type-delete-dialog.component.html'
})
export class CompanyTypeDeleteDialogComponent {

    companyType: CompanyType;

    constructor(
        private companyTypeService: CompanyTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.companyTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'companyTypeListModification',
                content: 'Deleted an companyType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-company-type-delete-popup',
    template: ''
})
export class CompanyTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private companyTypePopupService: CompanyTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.companyTypePopupService
                .open(CompanyTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

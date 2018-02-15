import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Fee } from './fee.model';
import { FeePopupService } from './fee-popup.service';
import { FeeService } from './fee.service';

@Component({
    selector: 'jhi-fee-dialog',
    templateUrl: './fee-dialog.component.html'
})
export class FeeDialogComponent implements OnInit {

    fee: Fee;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private feeService: FeeService,
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
        if (this.fee.id !== undefined) {
            this.subscribeToSaveResponse(
                this.feeService.update(this.fee));
        } else {
            this.subscribeToSaveResponse(
                this.feeService.create(this.fee));
        }
    }

    private subscribeToSaveResponse(result: Observable<Fee>) {
        result.subscribe((res: Fee) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Fee) {
        this.eventManager.broadcast({ name: 'feeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-fee-popup',
    template: ''
})
export class FeePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private feePopupService: FeePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.feePopupService
                    .open(FeeDialogComponent as Component, params['id']);
            } else {
                this.feePopupService
                    .open(FeeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

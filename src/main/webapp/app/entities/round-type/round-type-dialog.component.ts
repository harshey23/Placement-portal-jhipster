import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoundType } from './round-type.model';
import { RoundTypePopupService } from './round-type-popup.service';
import { RoundTypeService } from './round-type.service';

@Component({
    selector: 'jhi-round-type-dialog',
    templateUrl: './round-type-dialog.component.html'
})
export class RoundTypeDialogComponent implements OnInit {

    roundType: RoundType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private roundTypeService: RoundTypeService,
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
        if (this.roundType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roundTypeService.update(this.roundType));
        } else {
            this.subscribeToSaveResponse(
                this.roundTypeService.create(this.roundType));
        }
    }

    private subscribeToSaveResponse(result: Observable<RoundType>) {
        result.subscribe((res: RoundType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RoundType) {
        this.eventManager.broadcast({ name: 'roundTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-round-type-popup',
    template: ''
})
export class RoundTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roundTypePopupService: RoundTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roundTypePopupService
                    .open(RoundTypeDialogComponent as Component, params['id']);
            } else {
                this.roundTypePopupService
                    .open(RoundTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

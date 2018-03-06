import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Offer } from './offer.model';
import { OfferPopupService } from './offer-popup.service';
import { OfferService } from './offer.service';

@Component({
    selector: 'jhi-offer-dialog',
    templateUrl: './offer-dialog.component.html'
})
export class OfferDialogComponent implements OnInit {

    offer: Offer;
    isSaving: boolean;
    dateOfVisitDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private offerService: OfferService,
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
        if (this.offer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.offerService.update(this.offer));
        } else {
            this.subscribeToSaveResponse(
                this.offerService.create(this.offer));
        }
    }

    private subscribeToSaveResponse(result: Observable<Offer>) {
        result.subscribe((res: Offer) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Offer) {
        this.eventManager.broadcast({ name: 'offerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-offer-popup',
    template: ''
})
export class OfferPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private offerPopupService: OfferPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.offerPopupService
                    .open(OfferDialogComponent as Component, params['id']);
            } else {
                this.offerPopupService
                    .open(OfferDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

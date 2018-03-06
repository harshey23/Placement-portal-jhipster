import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Mytry } from './mytry.model';
import { MytryPopupService } from './mytry-popup.service';
import { MytryService } from './mytry.service';

@Component({
    selector: 'jhi-mytry-dialog',
    templateUrl: './mytry-dialog.component.html'
})
export class MytryDialogComponent implements OnInit {

    mytry: Mytry;
    isSaving: boolean;
    ldDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private mytryService: MytryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mytry.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mytryService.update(this.mytry));
        } else {
            this.subscribeToSaveResponse(
                this.mytryService.create(this.mytry));
        }
    }

    private subscribeToSaveResponse(result: Observable<Mytry>) {
        result.subscribe((res: Mytry) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Mytry) {
        this.eventManager.broadcast({ name: 'mytryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-mytry-popup',
    template: ''
})
export class MytryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mytryPopupService: MytryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mytryPopupService
                    .open(MytryDialogComponent as Component, params['id']);
            } else {
                this.mytryPopupService
                    .open(MytryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

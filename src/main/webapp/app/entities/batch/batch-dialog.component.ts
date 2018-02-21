import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Batch } from './batch.model';
import { BatchPopupService } from './batch-popup.service';
import { BatchService } from './batch.service';

@Component({
    selector: 'jhi-batch-dialog',
    templateUrl: './batch-dialog.component.html'
})
export class BatchDialogComponent implements OnInit {

    batch: Batch;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private batchService: BatchService,
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
        if (this.batch.id !== undefined) {
            this.subscribeToSaveResponse(
                this.batchService.update(this.batch));
        } else {
            this.subscribeToSaveResponse(
                this.batchService.create(this.batch));
        }
    }

    private subscribeToSaveResponse(result: Observable<Batch>) {
        result.subscribe((res: Batch) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Batch) {
        this.eventManager.broadcast({ name: 'batchListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-batch-popup',
    template: ''
})
export class BatchPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private batchPopupService: BatchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.batchPopupService
                    .open(BatchDialogComponent as Component, params['id']);
            } else {
                this.batchPopupService
                    .open(BatchDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

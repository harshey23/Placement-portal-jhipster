import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Batch } from './batch.model';
import { BatchPopupService } from './batch-popup.service';
import { BatchService } from './batch.service';

@Component({
    selector: 'jhi-batch-delete-dialog',
    templateUrl: './batch-delete-dialog.component.html'
})
export class BatchDeleteDialogComponent {

    batch: Batch;

    constructor(
        private batchService: BatchService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.batchService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'batchListModification',
                content: 'Deleted an batch'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-batch-delete-popup',
    template: ''
})
export class BatchDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private batchPopupService: BatchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.batchPopupService
                .open(BatchDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

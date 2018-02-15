import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Fee } from './fee.model';
import { FeePopupService } from './fee-popup.service';
import { FeeService } from './fee.service';

@Component({
    selector: 'jhi-fee-delete-dialog',
    templateUrl: './fee-delete-dialog.component.html'
})
export class FeeDeleteDialogComponent {

    fee: Fee;

    constructor(
        private feeService: FeeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.feeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'feeListModification',
                content: 'Deleted an fee'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fee-delete-popup',
    template: ''
})
export class FeeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private feePopupService: FeePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.feePopupService
                .open(FeeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

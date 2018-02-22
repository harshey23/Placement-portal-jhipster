import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoundType } from './round-type.model';
import { RoundTypePopupService } from './round-type-popup.service';
import { RoundTypeService } from './round-type.service';

@Component({
    selector: 'jhi-round-type-delete-dialog',
    templateUrl: './round-type-delete-dialog.component.html'
})
export class RoundTypeDeleteDialogComponent {

    roundType: RoundType;

    constructor(
        private roundTypeService: RoundTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.roundTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'roundTypeListModification',
                content: 'Deleted an roundType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-round-type-delete-popup',
    template: ''
})
export class RoundTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roundTypePopupService: RoundTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.roundTypePopupService
                .open(RoundTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

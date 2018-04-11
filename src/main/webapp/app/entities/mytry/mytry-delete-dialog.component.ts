import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Mytry } from './mytry.model';
import { MytryPopupService } from './mytry-popup.service';
import { MytryService } from './mytry.service';

@Component({
    selector: 'jhi-mytry-delete-dialog',
    templateUrl: './mytry-delete-dialog.component.html'
})
export class MytryDeleteDialogComponent {

    mytry: Mytry;

    constructor(
        private mytryService: MytryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.mytryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mytryListModification',
                content: 'Deleted an mytry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mytry-delete-popup',
    template: ''
})
export class MytryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mytryPopupService: MytryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mytryPopupService
                .open(MytryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Academic } from './academic.model';
import { AcademicPopupService } from './academic-popup.service';
import { AcademicService } from './academic.service';

@Component({
    selector: 'jhi-academic-delete-dialog',
    templateUrl: './academic-delete-dialog.component.html'
})
export class AcademicDeleteDialogComponent {

    academic: Academic;

    constructor(
        private academicService: AcademicService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.academicService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'academicListModification',
                content: 'Deleted an academic'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-academic-delete-popup',
    template: ''
})
export class AcademicDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private academicPopupService: AcademicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.academicPopupService
                .open(AcademicDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

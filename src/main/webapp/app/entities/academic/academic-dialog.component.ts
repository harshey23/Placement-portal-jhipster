import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Academic } from './academic.model';
import { AcademicPopupService } from './academic-popup.service';
import { AcademicService } from './academic.service';

@Component({
    selector: 'jhi-academic-dialog',
    templateUrl: './academic-dialog.component.html'
})
export class AcademicDialogComponent implements OnInit {

    academic: Academic;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private academicService: AcademicService,
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
        if (this.academic.id !== undefined) {
            this.subscribeToSaveResponse(
                this.academicService.update(this.academic));
        } else {
            this.subscribeToSaveResponse(
                this.academicService.create(this.academic));
        }
    }

    private subscribeToSaveResponse(result: Observable<Academic>) {
        result.subscribe((res: Academic) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Academic) {
        this.eventManager.broadcast({ name: 'academicListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-academic-popup',
    template: ''
})
export class AcademicPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private academicPopupService: AcademicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.academicPopupService
                    .open(AcademicDialogComponent as Component, params['id']);
            } else {
                this.academicPopupService
                    .open(AcademicDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Announcement } from './announcement.model';
import { AnnouncementPopupService } from './announcement-popup.service';
import { AnnouncementService } from './announcement.service';

@Component({
    selector: 'jhi-announcement-dialog',
    templateUrl: './announcement-dialog.component.html'
})
export class AnnouncementDialogComponent implements OnInit {

    announcement: Announcement;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private announcementService: AnnouncementService,
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
        if (this.announcement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.announcementService.update(this.announcement));
        } else {
            this.subscribeToSaveResponse(
                this.announcementService.create(this.announcement));
        }
    }

    private subscribeToSaveResponse(result: Observable<Announcement>) {
        result.subscribe((res: Announcement) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Announcement) {
        this.eventManager.broadcast({ name: 'announcementListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-announcement-popup',
    template: ''
})
export class AnnouncementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private announcementPopupService: AnnouncementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.announcementPopupService
                    .open(AnnouncementDialogComponent as Component, params['id']);
            } else {
                this.announcementPopupService
                    .open(AnnouncementDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

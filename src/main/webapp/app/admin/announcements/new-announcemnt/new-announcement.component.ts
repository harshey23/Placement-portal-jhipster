import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Announcement } from '../announcement.model';
import { AnnouncementService } from '../announcements.service';

@Component({
    selector: 'jhi-new-announcement',
    templateUrl: './new-announcement.component.html'
})
export class NewAnnouncementComponent implements OnInit {
    announcement: Announcement;
    isSaving: boolean;
    constructor(
            public location: Location,
            public activeModal: NgbActiveModal,
            private announcementService: AnnouncementService,
            private eventManager: JhiEventManager
        ) {}
        ngOnInit() {
			this.isSaving = false;
			this.announcement = new Announcement();
		}
		clear() {
			this.activeModal.dismiss('cancel');
		}
		goBack(): void {
			this.location.back();
		}
		save() {
			this.isSaving = true;
			this.subscribeToSaveResponse(
				this.announcementService.create(this.announcement));
				this.location.back();
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
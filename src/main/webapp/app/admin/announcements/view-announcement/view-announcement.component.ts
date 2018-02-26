import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Announcement } from '../announcement.model';
import { AnnouncementService } from '../announcements.service';

@Component({
    selector: 'jhi-view-announcement',
    templateUrl: './view-announcement.component.html'
})
export class ViewAnnouncementComponent implements OnInit, OnDestroy {

    announcement: Announcement;
        isSaving: boolean;
        routeSub: any;

        constructor(
            public location: Location,
            private announcementService: AnnouncementService,
            private eventManager: JhiEventManager,
            private route: ActivatedRoute,
        ) {
        }

        ngOnInit() {
            this.isSaving = false;
            this.announcement = new Announcement();
            this.routeSub = this.route.params.subscribe((params) => {
                if (params['id']) {
                    this.announcementService.find(params['id']).subscribe((announcement) => {
                        this.announcement = announcement;
                        console.log('detail called ', this.announcement);
                    });
                }
            });
        }

    goBack(): void {
        this.location.back();
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    private subscribeToSaveResponse(result: Observable<Announcement>) {
        result.subscribe((res: Announcement) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Announcement) {
        this.eventManager.broadcast({ name: 'announcementListModification', content: 'OK' });
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

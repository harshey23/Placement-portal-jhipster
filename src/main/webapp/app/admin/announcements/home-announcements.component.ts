import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

import { Announcement } from './announcement.model';

@Component({
    selector: 'jhi-announcements',
    templateUrl: './home-announcements.component.html'
})
export class AnnouncementComponent {
    
    constructor(
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {}
    

    newAnnouncement(): void {
        this.router.navigate(['/admin/announcements/new']);
    }
}
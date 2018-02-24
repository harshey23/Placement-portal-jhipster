import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { NewAnnouncementComponent } from './new-announcemnt/new-announcement.component';
import { ViewAnnouncementComponent } from './view-announcement/view-announcement.component';
import { AnnouncementComponent } from './home-announcements.component';

@Injectable()
export class AnnouncementResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const announcementsRoute: Routes = [
    {
        path: 'announcements/new',
        component: NewAnnouncementComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Announcements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'announcements/view/{id}',
        component: ViewAnnouncementComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Announcements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'announcements',
        component: AnnouncementComponent,
        resolve: {
            'pagingParams': AnnouncementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Announcements'
        },
        canActivate: [UserRouteAccessService]
    }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AnnouncementComponent } from './announcement.component';
import { AnnouncementDetailComponent } from './announcement-detail.component';
import { AnnouncementPopupComponent } from './announcement-dialog.component';
import { AnnouncementDeletePopupComponent } from './announcement-delete-dialog.component';

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

export const announcementRoute: Routes = [
    {
        path: 'announcement',
        component: AnnouncementComponent,
        resolve: {
            'pagingParams': AnnouncementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Announcements'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'announcement/:id',
        component: AnnouncementDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Announcements'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const announcementPopupRoute: Routes = [
    {
        path: 'announcement-new',
        component: AnnouncementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Announcements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'announcement/:id/edit',
        component: AnnouncementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Announcements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'announcement/:id/delete',
        component: AnnouncementDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Announcements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

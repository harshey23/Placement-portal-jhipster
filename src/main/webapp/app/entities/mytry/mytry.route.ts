import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MytryComponent } from './mytry.component';
import { MytryDetailComponent } from './mytry-detail.component';
import { MytryPopupComponent } from './mytry-dialog.component';
import { MytryDeletePopupComponent } from './mytry-delete-dialog.component';

@Injectable()
export class MytryResolvePagingParams implements Resolve<any> {

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

export const mytryRoute: Routes = [
    {
        path: 'mytry',
        component: MytryComponent,
        resolve: {
            'pagingParams': MytryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mytries'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mytry/:id',
        component: MytryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mytries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mytryPopupRoute: Routes = [
    {
        path: 'mytry-new',
        component: MytryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mytries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mytry/:id/edit',
        component: MytryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mytries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mytry/:id/delete',
        component: MytryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mytries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

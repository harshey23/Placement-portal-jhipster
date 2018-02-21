import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RoundTypeComponent } from './round-type.component';
import { RoundTypeDetailComponent } from './round-type-detail.component';
import { RoundTypePopupComponent } from './round-type-dialog.component';
import { RoundTypeDeletePopupComponent } from './round-type-delete-dialog.component';

@Injectable()
export class RoundTypeResolvePagingParams implements Resolve<any> {

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

export const roundTypeRoute: Routes = [
    {
        path: 'round-type',
        component: RoundTypeComponent,
        resolve: {
            'pagingParams': RoundTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoundTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'round-type/:id',
        component: RoundTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoundTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roundTypePopupRoute: Routes = [
    {
        path: 'round-type-new',
        component: RoundTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoundTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'round-type/:id/edit',
        component: RoundTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoundTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'round-type/:id/delete',
        component: RoundTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoundTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

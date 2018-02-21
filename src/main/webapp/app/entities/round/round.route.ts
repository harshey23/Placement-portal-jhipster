import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RoundComponent } from './round.component';
import { RoundDetailComponent } from './round-detail.component';
import { RoundPopupComponent } from './round-dialog.component';
import { RoundDeletePopupComponent } from './round-delete-dialog.component';

@Injectable()
export class RoundResolvePagingParams implements Resolve<any> {

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

export const roundRoute: Routes = [
    {
        path: 'round',
        component: RoundComponent,
        resolve: {
            'pagingParams': RoundResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rounds'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'round/:id',
        component: RoundDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rounds'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roundPopupRoute: Routes = [
    {
        path: 'round-new',
        component: RoundPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rounds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'round/:id/edit',
        component: RoundPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rounds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'round/:id/delete',
        component: RoundDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rounds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

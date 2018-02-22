import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FeeComponent } from './fee.component';
import { FeeDetailComponent } from './fee-detail.component';
import { FeePopupComponent } from './fee-dialog.component';
import { FeeDeletePopupComponent } from './fee-delete-dialog.component';

@Injectable()
export class FeeResolvePagingParams implements Resolve<any> {

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

export const feeRoute: Routes = [
    {
        path: 'fee',
        component: FeeComponent,
        resolve: {
            'pagingParams': FeeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fees'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fee/:id',
        component: FeeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fees'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const feePopupRoute: Routes = [
    {
        path: 'fee-new',
        component: FeePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fee/:id/edit',
        component: FeePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fee/:id/delete',
        component: FeeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

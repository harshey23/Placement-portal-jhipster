import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BatchComponent } from './batch.component';
import { BatchDetailComponent } from './batch-detail.component';
import { BatchPopupComponent } from './batch-dialog.component';
import { BatchDeletePopupComponent } from './batch-delete-dialog.component';

@Injectable()
export class BatchResolvePagingParams implements Resolve<any> {

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

export const batchRoute: Routes = [
    {
        path: 'batch',
        component: BatchComponent,
        resolve: {
            'pagingParams': BatchResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Batches'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'batch/:id',
        component: BatchDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Batches'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const batchPopupRoute: Routes = [
    {
        path: 'batch-new',
        component: BatchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Batches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'batch/:id/edit',
        component: BatchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Batches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'batch/:id/delete',
        component: BatchDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Batches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

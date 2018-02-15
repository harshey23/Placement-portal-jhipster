import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CompanyTypeComponent } from './company-type.component';
import { CompanyTypeDetailComponent } from './company-type-detail.component';
import { CompanyTypePopupComponent } from './company-type-dialog.component';
import { CompanyTypeDeletePopupComponent } from './company-type-delete-dialog.component';

@Injectable()
export class CompanyTypeResolvePagingParams implements Resolve<any> {

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

export const companyTypeRoute: Routes = [
    {
        path: 'company-type',
        component: CompanyTypeComponent,
        resolve: {
            'pagingParams': CompanyTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'company-type/:id',
        component: CompanyTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyTypePopupRoute: Routes = [
    {
        path: 'company-type-new',
        component: CompanyTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'company-type/:id/edit',
        component: CompanyTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'company-type/:id/delete',
        component: CompanyTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

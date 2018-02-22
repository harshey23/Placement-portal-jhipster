import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AcademicComponent } from './academic.component';
import { AcademicDetailComponent } from './academic-detail.component';
import { AcademicPopupComponent } from './academic-dialog.component';
import { AcademicDeletePopupComponent } from './academic-delete-dialog.component';

@Injectable()
export class AcademicResolvePagingParams implements Resolve<any> {

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

export const academicRoute: Routes = [
    {
        path: 'academic',
        component: AcademicComponent,
        resolve: {
            'pagingParams': AcademicResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Academics'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'academic/:id',
        component: AcademicDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Academics'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const academicPopupRoute: Routes = [
    {
        path: 'academic-new',
        component: AcademicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Academics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'academic/:id/edit',
        component: AcademicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Academics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'academic/:id/delete',
        component: AcademicDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Academics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

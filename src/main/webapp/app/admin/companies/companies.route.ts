import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';

@Injectable()
export class CompanyResolvePagingParams implements Resolve<any> {

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

export const companiesRoute: Routes = [
    {
        path: 'companies/add',
        component: AddComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Companies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'companies/detail/:id',
        component: DetailsComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Companies'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'companies/home',
        component: HomeComponent,
        resolve: {
            'pagingParams': CompanyResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Companies'
        },
        canActivate: [UserRouteAccessService]
    }
];

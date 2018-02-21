import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OfferComponent } from './offer.component';
import { OfferDetailComponent } from './offer-detail.component';
import { OfferPopupComponent } from './offer-dialog.component';
import { OfferDeletePopupComponent } from './offer-delete-dialog.component';

@Injectable()
export class OfferResolvePagingParams implements Resolve<any> {

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

export const offerRoute: Routes = [
    {
        path: 'offer',
        component: OfferComponent,
        resolve: {
            'pagingParams': OfferResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Offers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'offer/:id',
        component: OfferDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Offers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const offerPopupRoute: Routes = [
    {
        path: 'offer-new',
        component: OfferPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Offers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer/:id/edit',
        component: OfferPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Offers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer/:id/delete',
        component: OfferDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Offers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

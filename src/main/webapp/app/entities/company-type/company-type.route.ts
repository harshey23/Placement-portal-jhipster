import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CompanyTypeComponent } from './company-type.component';
import { CompanyTypeDetailComponent } from './company-type-detail.component';
import { CompanyTypePopupComponent } from './company-type-dialog.component';
import { CompanyTypeDeletePopupComponent } from './company-type-delete-dialog.component';

export const companyTypeRoute: Routes = [
    {
        path: 'company-type',
        component: CompanyTypeComponent,
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

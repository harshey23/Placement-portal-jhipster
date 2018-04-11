import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RoundTypeComponent } from './round-type.component';
import { RoundTypeDetailComponent } from './round-type-detail.component';
import { RoundTypePopupComponent } from './round-type-dialog.component';
import { RoundTypeDeletePopupComponent } from './round-type-delete-dialog.component';

export const roundTypeRoute: Routes = [
    {
        path: 'round-type',
        component: RoundTypeComponent,
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

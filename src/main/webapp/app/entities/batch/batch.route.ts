import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BatchComponent } from './batch.component';
import { BatchDetailComponent } from './batch-detail.component';
import { BatchPopupComponent } from './batch-dialog.component';
import { BatchDeletePopupComponent } from './batch-delete-dialog.component';

export const batchRoute: Routes = [
    {
        path: 'batch',
        component: BatchComponent,
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

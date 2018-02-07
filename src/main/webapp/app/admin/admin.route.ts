import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import {
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    metricsRoute,
    userMgmtRoute,
    userDialogRoute,
    tryRoute,
    analyticsRoute,
    companiesRoute,
    coordinatorRoute,
    dashboardRoute,
    generalElgibalRoute,
    jobsRoute,
    reportRoute,
    selectionProcessRoute,
    studentRoute
} from './';

import { UserRouteAccessService } from '../shared';

const ADMIN_ROUTES = [
    tryRoute,
    analyticsRoute,
   // ...companiesRoute,
    ...coordinatorRoute,
    dashboardRoute,
    ...generalElgibalRoute,
    ...jobsRoute,
    ...reportRoute,
    ...selectionProcessRoute,
    ...studentRoute,
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    ...userMgmtRoute,
    metricsRoute
];

export const adminState: Routes = [{
    path: 'admin',
    component: AdminComponent,
    data: {
        authorities: ['ROLE_ADMIN']
    },
    canActivate: [UserRouteAccessService],
    children: ADMIN_ROUTES
},
    ...userDialogRoute
];

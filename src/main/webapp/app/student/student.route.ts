import { Routes } from '@angular/router';
import { StudentComponent } from './student.component';

import {
    analyticsRoute,
    companiesRoute,
    dashboardRoute,
    noticeRoute,
    mocktestRoute,
    profileRoute
} from './';

import { UserRouteAccessService } from '../shared';

const STUDENT_ROUTES = [
    analyticsRoute,
    companiesRoute,
    dashboardRoute,
    noticeRoute,
    mocktestRoute,
    profileRoute
];

export const studentState: Routes = [{
    path: 'student',
    component: StudentComponent,
    data: {
        authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService],
    children: STUDENT_ROUTES
}
];

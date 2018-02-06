import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ReportHomeComponent } from './component/report-home/report-home.component';
import { ReportListComponent } from './component/report-list/report-list.component';

export const coordinatorRoute: Routes = [
    {
        path: 'report/home',
        component: ReportHomeComponent,
        data: {
            pageTitle: 'Report'
        }
    },
    {
        path: 'report/list',
        component: ReportListComponent,
        data: {
            pageTitle: 'Report'
        }
    }
];

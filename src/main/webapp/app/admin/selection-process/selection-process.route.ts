import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { SelectionProcessHomeComponent } from './component/selection-process-home/selection-process-home.component';
import { SelectionProcessCompanyListComponent } from './component/selection-process-company-list/selection-process-company-list.component';
import { RoundAddComponent } from './component/round-add/round-add.component';
import { RoundDetailComponent } from './component/round-detail/round-detail.component';
import { RoundListComponent } from './component/round-list/round-list.component';
import { RoundStudentListComponent } from './component/round-student-list/round-student-list.component';

export const selectionProcessRoute: Routes = [
    {
        path: 'selection',
        component: SelectionProcessCompanyListComponent,
        data: {
            pageTitle: 'Selection Process'
        }
    },
    {
        path: 'selection/:offer',
        component: RoundListComponent,
        data: {
            pageTitle: 'Selection Process'
        }
    },
    {
        path: 'selection/:offer/add-round',
        component: RoundAddComponent,
        data: {
            pageTitle: 'Selection Process'
        }
    },
    {
        path: 'selection/:offer/round/:round',
        component: RoundAddComponent,
        data: {
            pageTitle: 'Selection Process'
        }
    },
    {
        path: 'selection/:offer/round-student-list/:round',
        component: RoundStudentListComponent,
        data: {
            pageTitle: 'Selection Process'
        }
    },
];

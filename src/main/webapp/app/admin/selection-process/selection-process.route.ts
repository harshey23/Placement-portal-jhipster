import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { SelectionProcessHomeComponent } from './component/selection-process-home/selection-process-home.component';
import { SelectionProcessCompanyListComponent } from './component/selection-process-company-list/selection-process-company-list.component';

export const selectionProcessRoute: Routes = [
    {
        path: 'selection/company',
        component: SelectionProcessHomeComponent,
        data: {
            pageTitle: 'Selection Process'
        }
    },
    {
        path: 'selection/list',
        component: SelectionProcessCompanyListComponent,
        data: {
            pageTitle: 'Selection Process'
        }
    }
];

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { AdminCoordinatorComponent } from './component/admin-coordinator/admin-coordinator.component';
import { AdminCoordinatorAddComponent } from './component/admin-coordinator-add/admin-coordinator-add.component';
import { AdminCoordinatorDetailComponent } from './component/admin-coordinator-detail/admin-coordinator-detail.component';

export const coordinatorRoute: Routes = [
    {
        path: 'cord/home',
        component: AdminCoordinatorComponent,
        data: {
            pageTitle: 'Coordinator'
        }
    },
    {
        path: 'cord/add',
        component: AdminCoordinatorAddComponent,
        data: {
            pageTitle: 'Coordinator'
        }
    },
    {
        path: 'cord/detail',
        component: AdminCoordinatorDetailComponent,
        data: {
            pageTitle: 'Coordinator'
        }
    }
];

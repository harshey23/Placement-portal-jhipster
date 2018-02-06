import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { AdminStudentComponent } from './component/admin-student/admin-student.component';
import { AdminStudentAddComponent } from './component/admin-student-add/admin-student-add.component';
import { AdminStudentDetailComponent } from './component/admin-student-detail/admin-student-detail.component';
import { AdminStudentListComponent } from './component/admin-student-list/admin-student-list.component';

export const coordinatorRoute: Routes = [
    {
        path: 'job/completed',
        component: AdminStudentComponent,
        data: {
            pageTitle: 'Stuudent'
        }
    },
    {
        path: 'job/current',
        component: AdminStudentAddComponent,
        data: {
            pageTitle: 'Stuudent'
        }
    },
    {
        path: 'job',
        component: AdminStudentDetailComponent,
        data: {
            pageTitle: 'Stuudent'
        }
    },
    {
        path: 'job/post',
        component: AdminStudentListComponent,
        data: {
            pageTitle: 'Stuudent'
        }
    }
];

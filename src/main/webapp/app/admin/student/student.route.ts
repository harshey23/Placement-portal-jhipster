import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { AdminStudentComponent } from './component/admin-student/admin-student.component';
import { AdminStudentAddComponent } from './component/admin-student-add/admin-student-add.component';
import { AdminStudentDetailComponent } from './component/admin-student-detail/admin-student-detail.component';
import { AdminStudentListComponent } from './component/admin-student-list/admin-student-list.component';

export const studentRoute: Routes = [
    {
        path: 'student',
        component: AdminStudentComponent,
        data: {
            pageTitle: 'Student'
        }
    },
    {
        path: 'student/add',
        component: AdminStudentAddComponent,
        data: {
            pageTitle: 'Student'
        }
    },
    {
        path: 'student/detail',
        component: AdminStudentDetailComponent,
        data: {
            pageTitle: 'Student'
        }
    },
    {
        path: 'student/list',
        component: AdminStudentListComponent,
        data: {
            pageTitle: 'Student'
        }
    }
];

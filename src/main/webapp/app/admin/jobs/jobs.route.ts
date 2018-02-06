import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { CompletedDetailComponent } from './component/completed-detail/completed-detail.component';
import { CurrentDetailComponent } from './component/current-detail/current-detail.component';
import { JobHomeComponent } from './component/job-home/job-home.component';
import { PostComponent } from './component/post/post.component';

export const jobsRoute: Routes = [
    {
        path: 'job/completed',
        component: CompletedDetailComponent,
        data: {
            pageTitle: 'Job'
        }
    },
    {
        path: 'job/current',
        component: CurrentDetailComponent,
        data: {
            pageTitle: 'Job'
        }
    },
    {
        path: 'job',
        component: JobHomeComponent,
        data: {
            pageTitle: 'Job'
        }
    },
    {
        path: 'job/post',
        component: PostComponent,
        data: {
            pageTitle: 'Job'
        }
    }
];

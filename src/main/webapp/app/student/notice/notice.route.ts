import { Route } from '@angular/router';

import { NoticeComponent } from './notice.component';
import {ViewNoticeComponent } from './view-notice/view-notice.component';

export const noticeRoute: Route[] = [
    {
    path: 'notice',
    component: NoticeComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Notice'
    }
},
    {
        path: 'notice/view/:id',
        component: ViewNoticeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Announcements'
        }
    }
];

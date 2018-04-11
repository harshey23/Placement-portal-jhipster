import { Route } from '@angular/router';

import { NoticeComponent } from './notice.component';

export const noticeRoute: Route = {

    path: 'notice',
    component: NoticeComponent,
    data: {
        pageTitle: 'Notice'
    }

};

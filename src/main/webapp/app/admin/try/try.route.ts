import { Route } from '@angular/router';

import { TryComponent } from './try.component';

export const tryRoute: Route = {
    path: 'try',
    component: TryComponent,
    data: {
        pageTitle: 'Try'
    }
};

import { Routes } from '@angular/router';
import {ViewTestComponent} from '../mocktest/view-test/view-test.component';
import { MocktestComponent } from './mocktest.component';

export const mocktestRoute: Routes = [
    {

    path: 'mocktest',
    component: MocktestComponent,
    data: {
        pageTitle: 'Mock Test'
    }
},
    {
        path: 'mocktest/view/:id',
        component: ViewTestComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mock Test'
        }
    }

];

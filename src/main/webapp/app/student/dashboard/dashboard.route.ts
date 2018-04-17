import {Route, Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { DashboardComponent } from './dashboard.component';

export const dashboardRoute: Route = {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
        pageTitle: 'Dashboard'
    }
};

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';

export const companiesRoute: Routes = [
    {
        path: 'companies/add',
        component: AddComponent,
        data: {
            pageTitle: 'Company'
        }
    },
    {
        path: 'companies/detail/{id}',
        component: DetailsComponent,
        data: {
            pageTitle: 'Company'
        }
    },
    {
        path: 'companies/home',
        component: HomeComponent,
        data: {
            pageTitle: 'Company'
        }
    }
];

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';

import { CompaniesComponent } from './companies.component';

export const companiesRoute: Route = {
    path: 'companies',
    component: CompaniesComponent,
    data: {
        pageTitle: 'Company'
    }
};

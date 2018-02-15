import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlacementSharedModule } from '../../shared';
import {
    CompanyTypeService,
    CompanyTypePopupService,
    CompanyTypeComponent,
    CompanyTypeDetailComponent,
    CompanyTypeDialogComponent,
    CompanyTypePopupComponent,
    CompanyTypeDeletePopupComponent,
    CompanyTypeDeleteDialogComponent,
    companyTypeRoute,
    companyTypePopupRoute,
    CompanyTypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...companyTypeRoute,
    ...companyTypePopupRoute,
];

@NgModule({
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CompanyTypeComponent,
        CompanyTypeDetailComponent,
        CompanyTypeDialogComponent,
        CompanyTypeDeleteDialogComponent,
        CompanyTypePopupComponent,
        CompanyTypeDeletePopupComponent,
    ],
    entryComponents: [
        CompanyTypeComponent,
        CompanyTypeDialogComponent,
        CompanyTypePopupComponent,
        CompanyTypeDeleteDialogComponent,
        CompanyTypeDeletePopupComponent,
    ],
    providers: [
        CompanyTypeService,
        CompanyTypePopupService,
        CompanyTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementCompanyTypeModule {}

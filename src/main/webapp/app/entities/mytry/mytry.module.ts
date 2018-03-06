import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlacementSharedModule } from '../../shared';
import {
    MytryService,
    MytryPopupService,
    MytryComponent,
    MytryDetailComponent,
    MytryDialogComponent,
    MytryPopupComponent,
    MytryDeletePopupComponent,
    MytryDeleteDialogComponent,
    mytryRoute,
    mytryPopupRoute,
    MytryResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...mytryRoute,
    ...mytryPopupRoute,
];

@NgModule({
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MytryComponent,
        MytryDetailComponent,
        MytryDialogComponent,
        MytryDeleteDialogComponent,
        MytryPopupComponent,
        MytryDeletePopupComponent,
    ],
    entryComponents: [
        MytryComponent,
        MytryDialogComponent,
        MytryPopupComponent,
        MytryDeleteDialogComponent,
        MytryDeletePopupComponent,
    ],
    providers: [
        MytryService,
        MytryPopupService,
        MytryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementMytryModule {}

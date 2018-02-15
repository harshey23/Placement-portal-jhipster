import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlacementSharedModule } from '../../shared';
import {
    FeeService,
    FeePopupService,
    FeeComponent,
    FeeDetailComponent,
    FeeDialogComponent,
    FeePopupComponent,
    FeeDeletePopupComponent,
    FeeDeleteDialogComponent,
    feeRoute,
    feePopupRoute,
    FeeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...feeRoute,
    ...feePopupRoute,
];

@NgModule({
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FeeComponent,
        FeeDetailComponent,
        FeeDialogComponent,
        FeeDeleteDialogComponent,
        FeePopupComponent,
        FeeDeletePopupComponent,
    ],
    entryComponents: [
        FeeComponent,
        FeeDialogComponent,
        FeePopupComponent,
        FeeDeleteDialogComponent,
        FeeDeletePopupComponent,
    ],
    providers: [
        FeeService,
        FeePopupService,
        FeeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementFeeModule {}

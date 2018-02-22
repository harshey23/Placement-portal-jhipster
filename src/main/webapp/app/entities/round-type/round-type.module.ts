import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlacementSharedModule } from '../../shared';
import {
    RoundTypeService,
    RoundTypePopupService,
    RoundTypeComponent,
    RoundTypeDetailComponent,
    RoundTypeDialogComponent,
    RoundTypePopupComponent,
    RoundTypeDeletePopupComponent,
    RoundTypeDeleteDialogComponent,
    roundTypeRoute,
    roundTypePopupRoute,
    RoundTypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...roundTypeRoute,
    ...roundTypePopupRoute,
];

@NgModule({
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoundTypeComponent,
        RoundTypeDetailComponent,
        RoundTypeDialogComponent,
        RoundTypeDeleteDialogComponent,
        RoundTypePopupComponent,
        RoundTypeDeletePopupComponent,
    ],
    entryComponents: [
        RoundTypeComponent,
        RoundTypeDialogComponent,
        RoundTypePopupComponent,
        RoundTypeDeleteDialogComponent,
        RoundTypeDeletePopupComponent,
    ],
    providers: [
        RoundTypeService,
        RoundTypePopupService,
        RoundTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementRoundTypeModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlacementSharedModule } from '../../shared';
import {
    RoundService,
    RoundPopupService,
    RoundComponent,
    RoundDetailComponent,
    RoundDialogComponent,
    RoundPopupComponent,
    RoundDeletePopupComponent,
    RoundDeleteDialogComponent,
    roundRoute,
    roundPopupRoute,
    RoundResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...roundRoute,
    ...roundPopupRoute,
];

@NgModule({
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoundComponent,
        RoundDetailComponent,
        RoundDialogComponent,
        RoundDeleteDialogComponent,
        RoundPopupComponent,
        RoundDeletePopupComponent,
    ],
    entryComponents: [
        RoundComponent,
        RoundDialogComponent,
        RoundPopupComponent,
        RoundDeleteDialogComponent,
        RoundDeletePopupComponent,
    ],
    providers: [
        RoundService,
        RoundPopupService,
        RoundResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementRoundModule {}

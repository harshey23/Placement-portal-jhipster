import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlacementSharedModule } from '../../shared';
import {
    BatchService,
    BatchPopupService,
    BatchComponent,
    BatchDetailComponent,
    BatchDialogComponent,
    BatchPopupComponent,
    BatchDeletePopupComponent,
    BatchDeleteDialogComponent,
    batchRoute,
    batchPopupRoute,
    BatchResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...batchRoute,
    ...batchPopupRoute,
];

@NgModule({
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BatchComponent,
        BatchDetailComponent,
        BatchDialogComponent,
        BatchDeleteDialogComponent,
        BatchPopupComponent,
        BatchDeletePopupComponent,
    ],
    entryComponents: [
        BatchComponent,
        BatchDialogComponent,
        BatchPopupComponent,
        BatchDeleteDialogComponent,
        BatchDeletePopupComponent,
    ],
    providers: [
        BatchService,
        BatchPopupService,
        BatchResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementBatchModule {}

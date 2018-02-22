import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlacementSharedModule } from '../../shared';
import {
    AcademicService,
    AcademicPopupService,
    AcademicComponent,
    AcademicDetailComponent,
    AcademicDialogComponent,
    AcademicPopupComponent,
    AcademicDeletePopupComponent,
    AcademicDeleteDialogComponent,
    academicRoute,
    academicPopupRoute,
    AcademicResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...academicRoute,
    ...academicPopupRoute,
];

@NgModule({
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AcademicComponent,
        AcademicDetailComponent,
        AcademicDialogComponent,
        AcademicDeleteDialogComponent,
        AcademicPopupComponent,
        AcademicDeletePopupComponent,
    ],
    entryComponents: [
        AcademicComponent,
        AcademicDialogComponent,
        AcademicPopupComponent,
        AcademicDeleteDialogComponent,
        AcademicDeletePopupComponent,
    ],
    providers: [
        AcademicService,
        AcademicPopupService,
        AcademicResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementAcademicModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlacementSharedModule } from '../../shared';
import {
    AnnouncementService,
    AnnouncementPopupService,
    AnnouncementComponent,
    AnnouncementDetailComponent,
    AnnouncementDialogComponent,
    AnnouncementPopupComponent,
    AnnouncementDeletePopupComponent,
    AnnouncementDeleteDialogComponent,
    announcementRoute,
    announcementPopupRoute,
    AnnouncementResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...announcementRoute,
    ...announcementPopupRoute,
];

@NgModule({
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AnnouncementComponent,
        AnnouncementDetailComponent,
        AnnouncementDialogComponent,
        AnnouncementDeleteDialogComponent,
        AnnouncementPopupComponent,
        AnnouncementDeletePopupComponent,
    ],
    entryComponents: [
        AnnouncementComponent,
        AnnouncementDialogComponent,
        AnnouncementPopupComponent,
        AnnouncementDeleteDialogComponent,
        AnnouncementDeletePopupComponent,
    ],
    providers: [
        AnnouncementService,
        AnnouncementPopupService,
        AnnouncementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementAnnouncementModule {}

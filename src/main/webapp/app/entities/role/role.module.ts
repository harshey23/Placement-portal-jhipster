import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlacementSharedModule } from '../../shared';
import {
    RoleService,
    RolePopupService,
    RoleComponent,
    RoleDetailComponent,
    RoleDialogComponent,
    RolePopupComponent,
    RoleDeletePopupComponent,
    RoleDeleteDialogComponent,
    roleRoute,
    rolePopupRoute,
} from './';

const ENTITY_STATES = [
    ...roleRoute,
    ...rolePopupRoute,
];

@NgModule({
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoleComponent,
        RoleDetailComponent,
        RoleDialogComponent,
        RoleDeleteDialogComponent,
        RolePopupComponent,
        RoleDeletePopupComponent,
    ],
    entryComponents: [
        RoleComponent,
        RoleDialogComponent,
        RolePopupComponent,
        RoleDeleteDialogComponent,
        RoleDeletePopupComponent,
    ],
    providers: [
        RoleService,
        RolePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementRoleModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PlacementCompanyModule } from './company/company.module';
import { PlacementOfferModule } from './offer/offer.module';
import { PlacementApplicantModule } from './applicant/applicant.module';
import { PlacementRoundModule } from './round/round.module';
import { PlacementAcademicModule } from './academic/academic.module';
import { PlacementFeeModule } from './fee/fee.module';
import { PlacementAnnouncementModule } from './announcement/announcement.module';
import { PlacementRoleModule } from './role/role.module';
import { PlacementBatchModule } from './batch/batch.module';
import { PlacementCourseModule } from './course/course.module';
import { PlacementCompanyTypeModule } from './company-type/company-type.module';
import { PlacementRoundTypeModule } from './round-type/round-type.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PlacementCompanyModule,
        PlacementOfferModule,
        PlacementApplicantModule,
        PlacementRoundModule,
        PlacementAcademicModule,
        PlacementFeeModule,
        PlacementAnnouncementModule,
        PlacementRoleModule,
        PlacementBatchModule,
        PlacementCourseModule,
        PlacementCompanyTypeModule,
        PlacementRoundTypeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementEntityModule {}

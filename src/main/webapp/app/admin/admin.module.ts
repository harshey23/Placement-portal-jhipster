import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlacementSharedModule } from '../shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import { FooterComponent } from './template/footer/footer.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';

import {
    adminState,
    AuditsComponent,
    UserMgmtComponent,
    UserDialogComponent,
    UserDeleteDialogComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    JhiMetricsMonitoringModalComponent,
    JhiMetricsMonitoringComponent,
    JhiHealthModalComponent,
    JhiHealthCheckComponent,
    JhiConfigurationComponent,
    JhiDocsComponent,
    AuditsService,
    JhiConfigurationService,
    JhiHealthService,
    JhiMetricsService,
    LogsService,
    UserResolvePagingParams,
    UserResolve,
    UserModalService,
    AdminComponent,

    TryComponent,

    AnalyticsComponent,

    AddComponent,
    DetailsComponent,
    HomeComponent,

    AdminCoordinatorComponent,
    AdminCoordinatorAddComponent,
    AdminCoordinatorDetailComponent,

    DashboardComponent,

    GeneralEligibalFormComponent,
    GeneralEligibalListComponent,

    CompletedDetailComponent,
    CurrentDetailComponent,
    JobHomeComponent,
    PostComponent
} from './';

@NgModule({
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(adminState),
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        AuditsComponent,
        UserMgmtComponent,
        UserDialogComponent,
        UserDeleteDialogComponent,
        UserMgmtDetailComponent,
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        LogsComponent,
        JhiConfigurationComponent,
        JhiHealthCheckComponent,
        JhiHealthModalComponent,
        JhiDocsComponent,
        JhiMetricsMonitoringComponent,
        JhiMetricsMonitoringModalComponent,

        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        AdminComponent,
        TryComponent,
        AnalyticsComponent,
       // AddComponent,
       // DetailsComponent,
       // HomeComponent,
        AdminCoordinatorComponent,
        AdminCoordinatorAddComponent,
        AdminCoordinatorDetailComponent,
        DashboardComponent,
        GeneralEligibalFormComponent,
        GeneralEligibalListComponent,
       // CompletedDetailComponent,
       // CurrentDetailComponent,
       // JobHomeComponent,
       // PostComponent
    ],
    entryComponents: [
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        JhiHealthModalComponent,
        JhiMetricsMonitoringModalComponent,
    ],
    providers: [
        AuditsService,
        JhiConfigurationService,
        JhiHealthService,
        JhiMetricsService,
        LogsService,
        UserResolvePagingParams,
        UserResolve,
        UserModalService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementAdminModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { MatFormFieldModule} from '@angular/material';

// importing Material UI components
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormField,
  MatInputModule,
  MatNativeDateModule,
} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

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
    PostComponent,

    ReportHomeComponent,
    ReportListComponent,

    SelectionProcessHomeComponent,
    SelectionProcessCompanyListComponent,

    AdminStudentComponent,
    AdminStudentAddComponent,
    AdminStudentDetailComponent,
    AdminStudentListComponent


} from './';

@NgModule({
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(adminState),
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MultiselectDropdownModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatStepperModule,
        MatFormFieldModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
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
        PostComponent,
        ReportHomeComponent,
        ReportListComponent,
        SelectionProcessHomeComponent,
        SelectionProcessCompanyListComponent,
        AdminStudentComponent,
        AdminStudentAddComponent,
        AdminStudentDetailComponent,
        AdminStudentListComponent

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

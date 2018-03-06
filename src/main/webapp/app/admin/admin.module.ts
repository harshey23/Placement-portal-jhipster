import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
// importing Material UI components
import { MatInputModule, MatFormFieldModule, MatFormField, MatNativeDateModule} from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
    AnnouncementService,
    AnnouncementComponent,
    NewAnnouncementComponent,
    ViewAnnouncementComponent,
    AnnouncementResolvePagingParams,
    CompanyResolvePagingParams,
    CompanyService,
    CompanyTypeService,
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
    RoundAddComponent,
    RoundDetailComponent,
    RoundListComponent,
    RoundStudentListComponent,
    AdminStudentComponent,
    AdminStudentAddComponent,
    AdminStudentDetailComponent,
    AdminStudentListComponent
} from './';

@NgModule({

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
        AnnouncementComponent,
        NewAnnouncementComponent,
        ViewAnnouncementComponent,
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
        RoundAddComponent,
        RoundDetailComponent,
        RoundListComponent,
        RoundStudentListComponent,
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
    imports: [
        PlacementSharedModule,
        RouterModule.forChild(adminState),
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MultiselectDropdownModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatStepperModule,
        MatFormFieldModule,
        MatDatepickerModule
    ],
    providers: [
        AuditsService,
        JhiConfigurationService,
        JhiHealthService,
        JhiMetricsService,
        LogsService,
        UserResolvePagingParams,
        UserResolve,
        UserModalService,
        CompanyService,
        CompanyResolvePagingParams,
        AnnouncementService,
        AnnouncementResolvePagingParams,
        CompanyTypeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlacementAdminModule { }

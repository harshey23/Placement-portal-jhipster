import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CompaniesComponent } from './companies.component';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompanyService } from './company.services'

import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AddComponent } from './add/add.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CompaniesRoutingModule
  ],
  declarations: [
    CompaniesComponent,
    HomeComponent,
    DetailsComponent,
    AddComponent
  ],
  providers: [
    CompanyService
  ],
  exports: [
    HomeComponent
  ]

})
export class CompaniesModule { }

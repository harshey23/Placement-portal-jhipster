import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import 'rxjs/add/operator/filter';

import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Offer } from '../../offer.model';
import { OfferService } from '../../offer.service';
declare var $: any;

@Component({
  selector: 'jhi-admin-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  static ITEMS = 0;
  studentForm: FormGroup;

  isUG: boolean = true;
  offerType: string = 'job';

  branchesOptionsModel: number[] = [1, 2];
  pgBranchesOptionsModel: number[] = [1, 2];
  companiesOptionsModel: number[] = [];

  branches: IMultiSelectOption[] = [
    { id: 1, name: 'CSE' },
    { id: 2, name: 'ISE' },
    { id: 3, name: 'EC' },
    { id: 4, name: 'TC' },
    { id: 5, name: 'IT' },
    { id: 6, name: 'EE' },
    { id: 7, name: 'Mech' },
    { id: 8, name: 'EIEM' },
    { id: 9, name: 'Chem' },
    { id: 10, name: 'Civil' },
    { id: 11, name: 'Biotech' },
    { id: 12, name: 'Arch' },
  ];
  pgBranches: IMultiSelectOption[] = [
    { id: 1, name: 'M.Tech' },
    { id: 2, name: 'ISE' },
    { id: 3, name: 'EC' },
    { id: 7, name: 'Mech' }
  ];
  companies: IMultiSelectOption[] = [
    { id: 1, name: 'TCS' },
    { id: 2, name: 'Redbus' },
    { id: 3, name: 'ZScalar' },
    { id: 4, name: 'Siemens' },
    { id: 5, name: 'Tech Mahindra' },
    { id: 6, name: 'Infosys' },
    { id: 7, name: 'Wipro' },
    { id: 8, name: 'Amazon' },
    { id: 9, name: 'Google' },
    { id: 10, name: 'VMWare' },
    { id: 11, name: 'JPMorgan' },
    { id: 12, name: 'Global' },
  ];

  branchesSettings: IMultiSelectSettings = {
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 11,
  };
  pgBranchesSettings: IMultiSelectSettings = {
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 11,
  };
  companiesSettings: IMultiSelectSettings = {
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 5,
    // buttonClasses
  };

  branchesTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    defaultTitle: 'Select Branches',
    allSelected: 'All selected',
  };
  pgBranchesTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    defaultTitle: 'Select Branches',
    allSelected: 'All selected',
  };
  companiesTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    defaultTitle: 'Select Companies',
    allSelected: 'All selected',
  };

  offer: Offer;
  isSaving: boolean;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private offerService: OfferService,
    private eventManager: JhiEventManager
  ) { }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
    $.material.init();
    this.isSaving = false;
    this.offer = new Offer();
  }

  changeOfferType(event: Event): void {
    const value: string = (<HTMLSelectElement>event.srcElement).value;
    this.offerType = value.toLowerCase();
  }

  selectUG(isUG) {
    this.isUG = isUG;
    console.log(isUG);
  }

  goBack(): void {
    this.location.back();
  }
  save() {
      this.isSaving = true;
      this.subscribeToSaveResponse(
          this.offerService.create(this.offer));
          this.location.back();
  }

  private subscribeToSaveResponse(result: Observable<Offer>) {
      result.subscribe((res: Offer) =>
          this.onSaveSuccess(res), (res: Response) => this.onSaveError());
  }

  private onSaveSuccess(result: Offer) {
      this.eventManager.broadcast({ name: 'offerListModification', content: 'OK'});
      this.isSaving = false;
  }

  private onSaveError() {
      this.isSaving = false;
  }

}

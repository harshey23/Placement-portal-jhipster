import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'jhi-general-eligibal-form',
  templateUrl: './general-eligibal-form.component.html',
  styleUrls: ['./general-eligibal-form.component.scss']
})
export class GeneralEligibalFormComponent implements OnInit {

  static ITEMS = 0;
  studentForm: FormGroup;
  isUG: boolean = true;

  branchesOptionsModel: number[] = [1, 2];
  pgBranchesOptionsModel: number[] = [1, 2];
  companiesOptionsModel: number[] = [];

  branches: IMultiSelectOption[] = [
    { id: 1, name: 'CSE'},
    { id: 2, name: 'ISE'},
    { id: 3, name: 'EC'},
    { id: 4, name: 'TC'},
    { id: 5, name: 'IT'},
    { id: 6, name: 'EE'},
    { id: 7, name: 'Mech'},
    { id: 8, name: 'EIEM'},
    { id: 9, name: 'Chem'},
    { id: 10, name: 'Civil'},
    { id: 11, name: 'Biotech'},
    { id: 12, name: 'Arch'},
  ];
  pgBranches: IMultiSelectOption[] = [
    { id: 1, name: 'M.Tech'},
    { id: 2, name: 'ISE'},
    { id: 3, name: 'EC'},
    { id: 7, name: 'Mech'}
  ];
  companies: IMultiSelectOption[] = [
    { id: 1, name: 'TCS'},
    { id: 2, name: 'Redbus'},
    { id: 3, name: 'ZScalar'},
    { id: 4, name: 'Siemens'},
    { id: 5, name: 'Tech Mahindra'},
    { id: 6, name: 'Infosys'},
    { id: 7, name: 'Wipro'},
    { id: 8, name: 'Amazon'},
    { id: 9, name: 'Google'},
    { id: 10, name: 'VMWare'},
    { id: 11, name: 'JPMorgan'},
    { id: 12, name: 'Global'},
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

  constructor(private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

  generateList(): void {
    this.router.navigate(['/admin/general/list']);
  }

  selectUG(isUG) {
    this.isUG = isUG;
    console.log(isUG);
  }

}

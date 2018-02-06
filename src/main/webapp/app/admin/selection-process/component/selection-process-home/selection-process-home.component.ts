import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@Component({
  selector: 'app-selection-process-home',
  templateUrl: './selection-process-home.component.html',
  styleUrls: ['./selection-process-home.component.scss']
})
export class SelectionProcessHomeComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}

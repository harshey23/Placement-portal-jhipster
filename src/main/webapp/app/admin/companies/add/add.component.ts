import { NgModule , Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Response } from '@angular/http';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Company } from '../company.model';
import { CompanyService } from '../company.services';

@Component({
  selector: 'app-company-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

public  company: Company;
  isSaving: boolean;

//  types = ['It Services', 'IT core', 'Non-IT core'];
//  status = ['Active', 'Inactive', 'Obsolete'];

  constructor(
    public activeModal: NgbActiveModal,
    private companyService: CompanyService,
    private eventManager: JhiEventManager,
    private location: Location
  ) { }

  ngOnInit() {
    this.isSaving = false;
    this.company = new Company;
   }

  goBack(): void {
    this.location.back();
  }

  clear() {
    this.activeModal.dismiss('cancel');
}

save() {
        console.log("Form Submitted!");
        this.isSaving = true;

        this.subscribeToSaveResponse(
            this.companyService.create(this.company));
        this.location.back();
}

private subscribeToSaveResponse(result: Observable<Company>) {
    result.subscribe((res: Company) =>
        this.onSaveSuccess(res), (res: Response) => this.onSaveError());
}

private onSaveSuccess(result: Company) {
    this.eventManager.broadcast({ name: 'companyListModification', content: 'OK'});
    this.isSaving = false;
    this.activeModal.dismiss(result);
}

private onSaveError() {
    this.isSaving = false;
}

}
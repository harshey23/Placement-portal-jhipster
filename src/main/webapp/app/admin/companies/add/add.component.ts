import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Company } from '../company.model';
import { CompanyService } from '../company.services';
import { CompanyPopupService } from '../company-popup.service';

@Component({
  selector: 'app-company-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  company: Company;
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
   }

  goBack(): void {
    this.location.back();
  }

  clear() {
    this.activeModal.dismiss('cancel');
}

save() {
    this.isSaving = true;
    if (this.company.id !== undefined) {
        this.subscribeToSaveResponse(
            this.companyService.update(this.company));
    } else {
        this.subscribeToSaveResponse(
            this.companyService.create(this.company));
    }
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

@Component({
  selector: 'jhi-company-popup',
  template: ''
})
export class CompanyPopupComponent implements OnInit, OnDestroy {

  routeSub: any;

  constructor(
      private route: ActivatedRoute,
      private companyPopupService: CompanyPopupService
  ) {}

  ngOnInit() {
      this.routeSub = this.route.params.subscribe((params) => {
          if ( params['id'] ) {
              this.companyPopupService
                  .open(AddComponent as Component, params['id']);
          } else {
              this.companyPopupService
                  .open(AddComponent as Component);
          }
      });
  }

  ngOnDestroy() {
      this.routeSub.unsubscribe();
  }
}

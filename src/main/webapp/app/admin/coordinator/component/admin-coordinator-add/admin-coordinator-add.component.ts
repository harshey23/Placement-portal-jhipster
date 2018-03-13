import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { User, UserService } from '../../../../shared';
import { Location } from '@angular/common';

@Component({
  selector: 'jhi-admin-coordinator-add',
  templateUrl: './admin-coordinator-add.component.html',
  styleUrls: ['./admin-coordinator-add.component.scss']
})
export class AdminCoordinatorAddComponent implements OnInit {
  user: User;
  languages: any[];
  authorities: any[];
  isSaving: Boolean;
  courses: any[];

  constructor(
      private location: Location,
      public activeModal: NgbActiveModal,
      private userService: UserService,
      private eventManager: JhiEventManager
  ) { }

  ngOnInit() {
    this.isSaving = false;
    this.user = new User();
    this.courses = [];
    this.userService.courses().subscribe((courses) => {
        this.courses = courses;
    });
  }
  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    console.log(this.user);
    console.log(this.user.course);
        this.user.langKey = 'en';
        this.user.authorities = ['ROLE_COORDINATOR'];
        this.userService.create(this.user).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        this.location.back();
      }

private onSaveSuccess(result) {
    this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
    this.isSaving = false;
    this.activeModal.dismiss(result);
}

private onSaveError() {
    this.isSaving = false;
}

  goBack(): void {
    this.location.back();
  }

}

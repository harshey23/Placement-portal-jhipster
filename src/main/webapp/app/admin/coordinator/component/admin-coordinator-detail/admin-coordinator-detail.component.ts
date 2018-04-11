import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { User, UserService, ResponseWrapper } from '../../../../shared';

@Component({
  selector: 'jhi-admin-coordinator-detail',
  templateUrl: './admin-coordinator-detail.component.html',
  styleUrls: ['./admin-coordinator-detail.component.scss']
})
export class AdminCoordinatorDetailComponent implements OnInit {
  user: User;
  isSaving: boolean;
  routeSub: any;
  constructor(
    public location: Location,
    private userService: UserService,
    private eventManager: JhiEventManager,
    private route: ActivatedRoute,
) {
}
ngOnInit() {
  this.isSaving = false;
  this.user = new User();
  this.routeSub = this.route.params.subscribe((params) => {
      if (params['id']) {
          this.userService.find(params['id']).subscribe((user) => {
              this.user = user;
              console.log('detail called ', this.user);
          });
      }
  });
}

goBack(): void {
this.location.back();
}

private subscribeToSaveResponse(result: Observable<User>) {
result.subscribe((res: User) =>
  this.onSaveSuccess(res), (res: Response) => this.onSaveError());
}

private onSaveSuccess(result: User) {
this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
this.isSaving = false;
}

private onSaveError() {
this.isSaving = false;
}
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Location } from '@angular/common';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MocktestService } from '../mocktest.service';
import { Mocktest } from '../mocktest.model';

@Component({
    selector: 'jhi-view-test',
    templateUrl: './view-test.component.html'
})
export class ViewTestComponent implements OnInit, OnDestroy {

    mocktest: Mocktest;
        isSaving: boolean;
        routeSub: any;
        countDown: any;
        count = 120;

         constructor(
            public location: Location,
            private mocktestService: MocktestService,
            private eventManager: JhiEventManager,
            private route: ActivatedRoute,
        ) {
            this.countDown = timer(0, 1000).pipe(
                take(this.count),
                map(() => --this.count),
             );
        }

        ngOnInit() {
            this.isSaving = false;
            this.mocktest = new Mocktest();
            this.routeSub = this.route.params.subscribe((params) => {
                if (params['id']) {
                    this.mocktestService.find(params['id']).subscribe((mocktest) => {
                        this.mocktest = mocktest;
                        console.log('detail called ', this.mocktest);
                    });
                }
            });

        }

    goBack(): void {
        this.location.back();
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    private subscribeToSaveResponse(result: Observable<Mocktest>) {
        result.subscribe((res: Mocktest) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Mocktest) {
        this.eventManager.broadcast({ name: 'mocktestListModification', content: 'OK' });
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Academic } from './academic.model';
import { AcademicService } from './academic.service';

@Component({
    selector: 'jhi-academic-detail',
    templateUrl: './academic-detail.component.html'
})
export class AcademicDetailComponent implements OnInit, OnDestroy {

    academic: Academic;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private academicService: AcademicService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAcademics();
    }

    load(id) {
        this.academicService.find(id).subscribe((academic) => {
            this.academic = academic;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAcademics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'academicListModification',
            (response) => this.load(this.academic.id)
        );
    }
}

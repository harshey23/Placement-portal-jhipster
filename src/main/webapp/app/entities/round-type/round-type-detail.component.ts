import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoundType } from './round-type.model';
import { RoundTypeService } from './round-type.service';

@Component({
    selector: 'jhi-round-type-detail',
    templateUrl: './round-type-detail.component.html'
})
export class RoundTypeDetailComponent implements OnInit, OnDestroy {

    roundType: RoundType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roundTypeService: RoundTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRoundTypes();
    }

    load(id) {
        this.roundTypeService.find(id).subscribe((roundType) => {
            this.roundType = roundType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRoundTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'roundTypeListModification',
            (response) => this.load(this.roundType.id)
        );
    }
}

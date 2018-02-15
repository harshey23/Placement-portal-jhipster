import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Fee } from './fee.model';
import { FeeService } from './fee.service';

@Component({
    selector: 'jhi-fee-detail',
    templateUrl: './fee-detail.component.html'
})
export class FeeDetailComponent implements OnInit, OnDestroy {

    fee: Fee;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private feeService: FeeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFees();
    }

    load(id) {
        this.feeService.find(id).subscribe((fee) => {
            this.fee = fee;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFees() {
        this.eventSubscriber = this.eventManager.subscribe(
            'feeListModification',
            (response) => this.load(this.fee.id)
        );
    }
}

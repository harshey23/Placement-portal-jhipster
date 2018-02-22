import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Batch } from './batch.model';
import { BatchService } from './batch.service';

@Component({
    selector: 'jhi-batch-detail',
    templateUrl: './batch-detail.component.html'
})
export class BatchDetailComponent implements OnInit, OnDestroy {

    batch: Batch;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private batchService: BatchService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBatches();
    }

    load(id) {
        this.batchService.find(id).subscribe((batch) => {
            this.batch = batch;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBatches() {
        this.eventSubscriber = this.eventManager.subscribe(
            'batchListModification',
            (response) => this.load(this.batch.id)
        );
    }
}

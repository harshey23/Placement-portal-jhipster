import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Mytry } from './mytry.model';
import { MytryService } from './mytry.service';

@Component({
    selector: 'jhi-mytry-detail',
    templateUrl: './mytry-detail.component.html'
})
export class MytryDetailComponent implements OnInit, OnDestroy {

    mytry: Mytry;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private mytryService: MytryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMytries();
    }

    load(id) {
        this.mytryService.find(id).subscribe((mytry) => {
            this.mytry = mytry;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMytries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mytryListModification',
            (response) => this.load(this.mytry.id)
        );
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoundType } from './round-type.model';
import { RoundTypeService } from './round-type.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-round-type',
    templateUrl: './round-type.component.html'
})
export class RoundTypeComponent implements OnInit, OnDestroy {
roundTypes: RoundType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roundTypeService: RoundTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.roundTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.roundTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRoundTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RoundType) {
        return item.id;
    }
    registerChangeInRoundTypes() {
        this.eventSubscriber = this.eventManager.subscribe('roundTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

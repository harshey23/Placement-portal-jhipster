import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Offer } from './offer.model';
import { OfferService } from './offer.service';

@Injectable()
export class OfferPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private offerService: OfferService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.offerService.find(id).subscribe((offer) => {
                    if (offer.dateOfVisit) {
                        offer.dateOfVisit = {
                            year: offer.dateOfVisit.getFullYear(),
                            month: offer.dateOfVisit.getMonth() + 1,
                            day: offer.dateOfVisit.getDate()
                        };
                    }
                    if (offer.lastDate) {
                        offer.lastDate = {
                            year: offer.lastDate.getFullYear(),
                            month: offer.lastDate.getMonth() + 1,
                            day: offer.lastDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.offerModalRef(component, offer);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.offerModalRef(component, new Offer());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    offerModalRef(component: Component, offer: Offer): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.offer = offer;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}

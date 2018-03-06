import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Mytry } from './mytry.model';
import { MytryService } from './mytry.service';

@Injectable()
export class MytryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private mytryService: MytryService

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
                this.mytryService.find(id).subscribe((mytry) => {
                    if (mytry.ld) {
                        mytry.ld = {
                            year: mytry.ld.getFullYear(),
                            month: mytry.ld.getMonth() + 1,
                            day: mytry.ld.getDate()
                        };
                    }
                    mytry.inst = this.datePipe
                        .transform(mytry.inst, 'yyyy-MM-ddTHH:mm:ss');
                    mytry.zdt = this.datePipe
                        .transform(mytry.zdt, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.mytryModalRef(component, mytry);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.mytryModalRef(component, new Mytry());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    mytryModalRef(component: Component, mytry: Mytry): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mytry = mytry;
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

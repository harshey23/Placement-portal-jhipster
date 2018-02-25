import { Component, OnInit, DoCheck } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';

import { Account, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        if (this.isAuthenticated()) {
            this.principal.hasAuthority('ROLE_ADMIN').then((authorised) => {
                if (authorised) {
                    console.log('redirecting to admin ' + authorised);
                    this.router.navigate(['/admin/dashboard']);
                }
            });
            this.principal.hasAuthority('ROLE_USER').then((authorised) => {
                if (authorised) {
                    console.log('redirecting to student ' + authorised);
                    // this.router.navigate(['/admin/dashboard']);
                }
            });
        }
    }

    // ngDoCheck() {
    //     if(this.isAuthenticated()) {
    //         this.principal.hasAuthority("ROLE_ADMIN").then((authorised) => {
    //             if(authorised) {
    //                 console.log("redirecting to admin " + authorised);
    //                 this.router.navigate(['/admin/dashboard']);
    //             }
    //         });
    //         this.principal.hasAuthority("ROLE_USER").then((authorised) => {
    //             if(authorised) {
    //                 console.log("redirecting to student " + authorised);
    //                 // this.router.navigate(['/admin/dashboard']);
    //             }
    //         });
    //     }
    // }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}

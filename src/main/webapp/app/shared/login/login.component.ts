import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from './login.service';
import { StateStorageService } from '../auth/state-storage.service';
import { Principal } from '../';

declare var $ : any;

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html',
    styleUrls: [
            './login.component.css'
        ]
})
export class JhiLoginModalComponent implements AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;

    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        // public activeModal: NgbActiveModal
    ) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }

    modalclose(){

            $('mymodal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        // this.activeModal.dismiss('cancel');
    }

    login() {
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.authenticationError = false;
            // this.activeModal.dismiss('login success');
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['']);
            }

            if(this.isAuthenticated()) {
                this.principal.hasAuthority("ROLE_ADMIN").then((authorised) => {
                    if(authorised) {
                        console.log("redirecting to admin " + authorised);
                        this.router.navigate(['/admin/dashboard']);
                    }
                });
                this.principal.hasAuthority("ROLE_USER").then((authorised) => {
                    if(authorised) {
                        console.log("redirecting to student " + authorised);
                        this.router.navigate(['/student/dashboard']);
                    }
                });
            }

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });

            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
        }).catch(() => {
            this.authenticationError = true;
        });
    }

    register() {
        // this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        // this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}

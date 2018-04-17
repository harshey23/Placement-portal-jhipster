import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import 'rxjs/add/operator/filter';
import { Principal, AccountService } from '../../shared';

declare var $: any;

@Component({
    selector: 'jhi-student-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    error: string;
    success: string;
    student: any = {};
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString());
    selected = 'option2';
    nats = [
        { value: '0', viewValue: 'Indian' },
        { value: '1', viewValue: 'NRI' },
        { value: '2', viewValue: 'Others' }
    ];
    categories = [
        { value: '0', viewValue: 'General' },
        { value: '1', viewValue: 'SC/ST' },
        { value: '2', viewValue: 'OBC' }
    ];
    religions = [
        { value: '0', viewValue: 'Hindu' },
        { value: '1', viewValue: 'Muslim' },
        { value: '2', viewValue: 'Others' }
    ];

    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    constructor(
        public location: Location,
        private router: Router,
        private _formBuilder: FormBuilder,
        private account: AccountService,
        private principal: Principal
    ) { }

    ngOnInit() {

        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });

        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                if (event.url !== this.lastPoppedUrl) {
                    this.yScrollStack.push(window.scrollY);
                }
            } else if (event instanceof NavigationEnd) {
                if (event.url === this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else {
                    window.scrollTo(0, 0);
                }
            }
        });
        this._router = this.router.events.filter((event) => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            elemMainPanel.scrollTop = 0;
            elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }

        this.principal.identity().then((account) => {
            this.student = account;
        });
    }

    // ngAfterViewInit() {
    //     this.runOnRouteChange();
    // }

    save() {
        this.account.save(this.student).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.student = account;
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    isMaps(path) {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (path === titlee) {
            return false;
        } else {
            return true;
        }
    }
    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}

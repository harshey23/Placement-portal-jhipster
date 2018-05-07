import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: 'notice', title: 'Notice', icon: 'featured_play_list', class: '' },
    { path: 'profile', title: 'Profile', icon: 'person', class: '' },
    { path: 'companies', title: 'Companies', icon: 'domain', class: '' },
    { path: 'mocktest', title: 'Mock Test', icon: 'dashboard', class: '' },
    { path: 'newf', title: 'New Feature', icon: 'featured_play_list', class: '' }

    // { path: 'analytics', title: 'Analytics', icon: 'multiline_chart', class: '' },
];

@Component({
    selector: 'jhi-student-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter((menuItem) => menuItem);
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}

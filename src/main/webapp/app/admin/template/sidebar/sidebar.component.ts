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
    { path: 'companies/home', title: 'Companies', icon: 'business', class: '' },
    // { path: 'student', title: 'Students', icon: 'people', class: '' },
    // { path: 'general', title: 'General Eligibilility', icon: 'description', class: '' },
    { path: 'job', title: 'Jobs', icon: 'next_week', class: '' },
    // { path: 'selection', title: 'Selection Process', icon: 'swap_vert', class: '' },
    // { path: 'report/home', title: 'Reports', icon: 'library_books', class: '' },
    // { path: 'analytics', title: 'Analytics', icon: 'multiline_chart', class: '' },
    { path: 'cord/home', title: 'Co-Ordinators', icon: 'people', class: '' },
    { path: 'announcements', title: 'Announcements', icon: 'people', class: '' },
    { path: 'analytic', title: 'New Feature 1', icon: 'multiline_chart', class: '' }
   // { path: 'analytics', title: 'New Feature 2', icon: 'multiline_chart', class: '' }

];

@Component({
  selector: 'jhi-admin-sidebar',
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

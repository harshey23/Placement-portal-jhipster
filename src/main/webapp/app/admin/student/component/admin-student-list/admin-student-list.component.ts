import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-app-admin-student-list',
  templateUrl: './admin-student-list.component.html',
  styleUrls: ['./admin-student-list.component.scss']
})
export class AdminStudentListComponent implements OnInit {

  constructor(private location: Location , private router: Router) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  gotoDetail(): void {
    this.router.navigate(['/admin/student/detail']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.scss']
})
export class AdminStudentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  listReport(): void {
    this.router.navigate(['/admin/student/list']);
  }

  addStudent(): void {
    this.router.navigate(['/admin/student/add']);
  }
}

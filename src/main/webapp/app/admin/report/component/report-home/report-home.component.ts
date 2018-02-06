import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.scss']
})
export class ReportHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoList(): void {
    this.router.navigate(['/admin/report/list']);
  }

}

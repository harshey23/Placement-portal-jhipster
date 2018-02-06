import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-home',
  templateUrl: './job-home.component.html',
  styleUrls: ['./job-home.component.scss']
})

export class JobHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  post(): void{
    this.router.navigate(['/admin/job/post']);
  }

  gotoCurrentDetails(): void{
    this.router.navigate(['/admin/job/current']);
  }

  gotoCompletedDetails(): void{
    this.router.navigate(['/admin/job/completed']);
  }
}

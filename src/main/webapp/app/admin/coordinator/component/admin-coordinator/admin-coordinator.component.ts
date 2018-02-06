import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-coordinator',
  templateUrl: './admin-coordinator.component.html',
  styleUrls: ['./admin-coordinator.component.scss']
})
export class AdminCoordinatorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoDetail(): void {
    this.router.navigate(['/admin/cord/detail']);
  }

  addCoordinator(): void {
    this.router.navigate(['/admin/cord/add']);
  }

}

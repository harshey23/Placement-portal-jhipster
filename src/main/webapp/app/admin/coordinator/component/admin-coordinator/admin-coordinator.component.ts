import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-admin-coordinator',
  templateUrl: './admin-coordinator.component.html',
  styleUrls: ['./admin-coordinator.component.scss']
})
export class AdminCoordinatorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoDetail(id: any): void {
    this.router.navigate(['/admin/cord/detail', id]);
  }

  addCoordinator(): void {
    this.router.navigate(['/admin/cord/add']);
  }

}

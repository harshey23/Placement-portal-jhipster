import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-coordinator-detail',
  templateUrl: './admin-coordinator-detail.component.html',
  styleUrls: ['./admin-coordinator-detail.component.scss']
})
export class AdminCoordinatorDetailComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }
}

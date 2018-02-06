import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-coordinator-add',
  templateUrl: './admin-coordinator-add.component.html',
  styleUrls: ['./admin-coordinator-add.component.scss']
})
export class AdminCoordinatorAddComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}

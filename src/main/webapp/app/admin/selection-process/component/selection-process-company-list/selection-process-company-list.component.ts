import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-process-company-list',
  templateUrl: './selection-process-company-list.component.html',
  styleUrls: ['./selection-process-company-list.component.scss']
})
export class SelectionProcessCompanyListComponent implements OnInit {

  constructor(private router: Router) { }

    ngOnInit() {}

    gotoSelectionProcess(): void {
        this.router.navigate(['/admin/selection/company']);
    }
}

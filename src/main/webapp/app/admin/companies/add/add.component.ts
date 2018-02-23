import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Company } from '../company.model';
import { CompanyService } from '../company.services';

@Component({
	selector: 'app-company-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

	company: Company;
	isSaving: boolean;

	constructor(
		public location: Location,
		private companyService: CompanyService,
		private eventManager: JhiEventManager
	) {
	}

	ngOnInit() {
		this.isSaving = false;
		this.company = new Company();
	}

	save() {
		this.isSaving = true;
		console.log(this.company);
		this.subscribeToSaveResponse(this.companyService.create(this.company));
	}

	goBack(): void {
		this.location.back();
	}

	private subscribeToSaveResponse(result: Observable<Company>) {
		result.subscribe((res: Company) =>
			this.onSaveSuccess(res), (res: Response) => this.onSaveError());
	}

	private onSaveSuccess(result: Company) {
		this.eventManager.broadcast({ name: 'companyListModification', content: 'OK' });
		this.isSaving = false;
	}

	private onSaveError() {
		this.isSaving = false;
	}
}
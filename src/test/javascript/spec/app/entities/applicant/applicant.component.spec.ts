/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PlacementTestModule } from '../../../test.module';
import { ApplicantComponent } from '../../../../../../main/webapp/app/entities/applicant/applicant.component';
import { ApplicantService } from '../../../../../../main/webapp/app/entities/applicant/applicant.service';
import { Applicant } from '../../../../../../main/webapp/app/entities/applicant/applicant.model';

describe('Component Tests', () => {

    describe('Applicant Management Component', () => {
        let comp: ApplicantComponent;
        let fixture: ComponentFixture<ApplicantComponent>;
        let service: ApplicantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [ApplicantComponent],
                providers: [
                    ApplicantService
                ]
            })
            .overrideTemplate(ApplicantComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicantComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Applicant('123')],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.applicants[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

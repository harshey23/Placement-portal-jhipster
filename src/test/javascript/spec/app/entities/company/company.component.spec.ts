/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PlacementTestModule } from '../../../test.module';
import { CompanyComponent } from '../../../../../../main/webapp/app/entities/company/company.component';
import { CompanyService } from '../../../../../../main/webapp/app/entities/company/company.service';
import { Company } from '../../../../../../main/webapp/app/entities/company/company.model';

describe('Component Tests', () => {

    describe('Company Management Component', () => {
        let comp: CompanyComponent;
        let fixture: ComponentFixture<CompanyComponent>;
        let service: CompanyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [CompanyComponent],
                providers: [
                    CompanyService
                ]
            })
            .overrideTemplate(CompanyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Company('123')],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.companies[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

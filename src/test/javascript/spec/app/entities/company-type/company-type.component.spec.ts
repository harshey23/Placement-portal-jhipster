/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PlacementTestModule } from '../../../test.module';
import { CompanyTypeComponent } from '../../../../../../main/webapp/app/entities/company-type/company-type.component';
import { CompanyTypeService } from '../../../../../../main/webapp/app/entities/company-type/company-type.service';
import { CompanyType } from '../../../../../../main/webapp/app/entities/company-type/company-type.model';

describe('Component Tests', () => {

    describe('CompanyType Management Component', () => {
        let comp: CompanyTypeComponent;
        let fixture: ComponentFixture<CompanyTypeComponent>;
        let service: CompanyTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [CompanyTypeComponent],
                providers: [
                    CompanyTypeService
                ]
            })
            .overrideTemplate(CompanyTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CompanyType('123')],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.companyTypes[0]).toEqual(jasmine.objectContaining({companyType: '123'}));
            });
        });
    });

});

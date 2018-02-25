/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PlacementTestModule } from '../../../test.module';
import { CompanyTypeDetailComponent } from '../../../../../../main/webapp/app/entities/company-type/company-type-detail.component';
import { CompanyTypeService } from '../../../../../../main/webapp/app/entities/company-type/company-type.service';
import { CompanyType } from '../../../../../../main/webapp/app/entities/company-type/company-type.model';

describe('Component Tests', () => {

    describe('CompanyType Management Detail Component', () => {
        let comp: CompanyTypeDetailComponent;
        let fixture: ComponentFixture<CompanyTypeDetailComponent>;
        let service: CompanyTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [CompanyTypeDetailComponent],
                providers: [
                    CompanyTypeService
                ]
            })
            .overrideTemplate(CompanyTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CompanyType('123')));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.companyType).toEqual(jasmine.objectContaining({companyType: '123'}));
            });
        });
    });

});

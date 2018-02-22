/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PlacementTestModule } from '../../../test.module';
import { AcademicDetailComponent } from '../../../../../../main/webapp/app/entities/academic/academic-detail.component';
import { AcademicService } from '../../../../../../main/webapp/app/entities/academic/academic.service';
import { Academic } from '../../../../../../main/webapp/app/entities/academic/academic.model';

describe('Component Tests', () => {

    describe('Academic Management Detail Component', () => {
        let comp: AcademicDetailComponent;
        let fixture: ComponentFixture<AcademicDetailComponent>;
        let service: AcademicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [AcademicDetailComponent],
                providers: [
                    AcademicService
                ]
            })
            .overrideTemplate(AcademicDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AcademicDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcademicService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Academic('123')));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.academic).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

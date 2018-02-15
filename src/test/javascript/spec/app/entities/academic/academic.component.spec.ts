/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PlacementTestModule } from '../../../test.module';
import { AcademicComponent } from '../../../../../../main/webapp/app/entities/academic/academic.component';
import { AcademicService } from '../../../../../../main/webapp/app/entities/academic/academic.service';
import { Academic } from '../../../../../../main/webapp/app/entities/academic/academic.model';

describe('Component Tests', () => {

    describe('Academic Management Component', () => {
        let comp: AcademicComponent;
        let fixture: ComponentFixture<AcademicComponent>;
        let service: AcademicService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [AcademicComponent],
                providers: [
                    AcademicService
                ]
            })
            .overrideTemplate(AcademicComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AcademicComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcademicService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Academic('123')],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.academics[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

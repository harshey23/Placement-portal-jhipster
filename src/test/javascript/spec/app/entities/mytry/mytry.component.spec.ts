/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PlacementTestModule } from '../../../test.module';
import { MytryComponent } from '../../../../../../main/webapp/app/entities/mytry/mytry.component';
import { MytryService } from '../../../../../../main/webapp/app/entities/mytry/mytry.service';
import { Mytry } from '../../../../../../main/webapp/app/entities/mytry/mytry.model';

describe('Component Tests', () => {

    describe('Mytry Management Component', () => {
        let comp: MytryComponent;
        let fixture: ComponentFixture<MytryComponent>;
        let service: MytryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [MytryComponent],
                providers: [
                    MytryService
                ]
            })
            .overrideTemplate(MytryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MytryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MytryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Mytry('123')],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mytries[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

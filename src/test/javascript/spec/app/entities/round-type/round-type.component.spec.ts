/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PlacementTestModule } from '../../../test.module';
import { RoundTypeComponent } from '../../../../../../main/webapp/app/entities/round-type/round-type.component';
import { RoundTypeService } from '../../../../../../main/webapp/app/entities/round-type/round-type.service';
import { RoundType } from '../../../../../../main/webapp/app/entities/round-type/round-type.model';

describe('Component Tests', () => {

    describe('RoundType Management Component', () => {
        let comp: RoundTypeComponent;
        let fixture: ComponentFixture<RoundTypeComponent>;
        let service: RoundTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [RoundTypeComponent],
                providers: [
                    RoundTypeService
                ]
            })
            .overrideTemplate(RoundTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoundTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoundTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RoundType('123')],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.roundTypes[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

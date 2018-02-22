/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PlacementTestModule } from '../../../test.module';
import { RoundTypeDetailComponent } from '../../../../../../main/webapp/app/entities/round-type/round-type-detail.component';
import { RoundTypeService } from '../../../../../../main/webapp/app/entities/round-type/round-type.service';
import { RoundType } from '../../../../../../main/webapp/app/entities/round-type/round-type.model';

describe('Component Tests', () => {

    describe('RoundType Management Detail Component', () => {
        let comp: RoundTypeDetailComponent;
        let fixture: ComponentFixture<RoundTypeDetailComponent>;
        let service: RoundTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [RoundTypeDetailComponent],
                providers: [
                    RoundTypeService
                ]
            })
            .overrideTemplate(RoundTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoundTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoundTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RoundType('123')));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.roundType).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PlacementTestModule } from '../../../test.module';
import { MytryDetailComponent } from '../../../../../../main/webapp/app/entities/mytry/mytry-detail.component';
import { MytryService } from '../../../../../../main/webapp/app/entities/mytry/mytry.service';
import { Mytry } from '../../../../../../main/webapp/app/entities/mytry/mytry.model';

describe('Component Tests', () => {

    describe('Mytry Management Detail Component', () => {
        let comp: MytryDetailComponent;
        let fixture: ComponentFixture<MytryDetailComponent>;
        let service: MytryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [MytryDetailComponent],
                providers: [
                    MytryService
                ]
            })
            .overrideTemplate(MytryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MytryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MytryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Mytry('123')));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.mytry).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

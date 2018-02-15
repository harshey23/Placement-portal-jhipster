/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PlacementTestModule } from '../../../test.module';
import { FeeDetailComponent } from '../../../../../../main/webapp/app/entities/fee/fee-detail.component';
import { FeeService } from '../../../../../../main/webapp/app/entities/fee/fee.service';
import { Fee } from '../../../../../../main/webapp/app/entities/fee/fee.model';

describe('Component Tests', () => {

    describe('Fee Management Detail Component', () => {
        let comp: FeeDetailComponent;
        let fixture: ComponentFixture<FeeDetailComponent>;
        let service: FeeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [FeeDetailComponent],
                providers: [
                    FeeService
                ]
            })
            .overrideTemplate(FeeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FeeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FeeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Fee('123')));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.fee).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

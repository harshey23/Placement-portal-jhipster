/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PlacementTestModule } from '../../../test.module';
import { BatchDetailComponent } from '../../../../../../main/webapp/app/entities/batch/batch-detail.component';
import { BatchService } from '../../../../../../main/webapp/app/entities/batch/batch.service';
import { Batch } from '../../../../../../main/webapp/app/entities/batch/batch.model';

describe('Component Tests', () => {

    describe('Batch Management Detail Component', () => {
        let comp: BatchDetailComponent;
        let fixture: ComponentFixture<BatchDetailComponent>;
        let service: BatchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [BatchDetailComponent],
                providers: [
                    BatchService
                ]
            })
            .overrideTemplate(BatchDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BatchDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BatchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Batch('123')));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.batch).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PlacementTestModule } from '../../../test.module';
import { BatchComponent } from '../../../../../../main/webapp/app/entities/batch/batch.component';
import { BatchService } from '../../../../../../main/webapp/app/entities/batch/batch.service';
import { Batch } from '../../../../../../main/webapp/app/entities/batch/batch.model';

describe('Component Tests', () => {

    describe('Batch Management Component', () => {
        let comp: BatchComponent;
        let fixture: ComponentFixture<BatchComponent>;
        let service: BatchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [BatchComponent],
                providers: [
                    BatchService
                ]
            })
            .overrideTemplate(BatchComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BatchComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BatchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Batch('123')],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.batches[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

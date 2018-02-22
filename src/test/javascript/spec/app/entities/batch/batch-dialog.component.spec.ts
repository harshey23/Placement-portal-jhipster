/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PlacementTestModule } from '../../../test.module';
import { BatchDialogComponent } from '../../../../../../main/webapp/app/entities/batch/batch-dialog.component';
import { BatchService } from '../../../../../../main/webapp/app/entities/batch/batch.service';
import { Batch } from '../../../../../../main/webapp/app/entities/batch/batch.model';

describe('Component Tests', () => {

    describe('Batch Management Dialog Component', () => {
        let comp: BatchDialogComponent;
        let fixture: ComponentFixture<BatchDialogComponent>;
        let service: BatchService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [BatchDialogComponent],
                providers: [
                    BatchService
                ]
            })
            .overrideTemplate(BatchDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BatchDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BatchService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Batch('123');
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.batch = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'batchListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Batch();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.batch = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'batchListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

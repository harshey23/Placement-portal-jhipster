/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PlacementTestModule } from '../../../test.module';
import { FeeDialogComponent } from '../../../../../../main/webapp/app/entities/fee/fee-dialog.component';
import { FeeService } from '../../../../../../main/webapp/app/entities/fee/fee.service';
import { Fee } from '../../../../../../main/webapp/app/entities/fee/fee.model';

describe('Component Tests', () => {

    describe('Fee Management Dialog Component', () => {
        let comp: FeeDialogComponent;
        let fixture: ComponentFixture<FeeDialogComponent>;
        let service: FeeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [FeeDialogComponent],
                providers: [
                    FeeService
                ]
            })
            .overrideTemplate(FeeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FeeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FeeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Fee('123');
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.fee = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'feeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Fee();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.fee = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'feeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PlacementTestModule } from '../../../test.module';
import { RoundTypeDialogComponent } from '../../../../../../main/webapp/app/entities/round-type/round-type-dialog.component';
import { RoundTypeService } from '../../../../../../main/webapp/app/entities/round-type/round-type.service';
import { RoundType } from '../../../../../../main/webapp/app/entities/round-type/round-type.model';

describe('Component Tests', () => {

    describe('RoundType Management Dialog Component', () => {
        let comp: RoundTypeDialogComponent;
        let fixture: ComponentFixture<RoundTypeDialogComponent>;
        let service: RoundTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [RoundTypeDialogComponent],
                providers: [
                    RoundTypeService
                ]
            })
            .overrideTemplate(RoundTypeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoundTypeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoundTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RoundType('123');
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.roundType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'roundTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RoundType();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.roundType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'roundTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

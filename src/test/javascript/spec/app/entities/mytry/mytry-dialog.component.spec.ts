/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PlacementTestModule } from '../../../test.module';
import { MytryDialogComponent } from '../../../../../../main/webapp/app/entities/mytry/mytry-dialog.component';
import { MytryService } from '../../../../../../main/webapp/app/entities/mytry/mytry.service';
import { Mytry } from '../../../../../../main/webapp/app/entities/mytry/mytry.model';

describe('Component Tests', () => {

    describe('Mytry Management Dialog Component', () => {
        let comp: MytryDialogComponent;
        let fixture: ComponentFixture<MytryDialogComponent>;
        let service: MytryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [MytryDialogComponent],
                providers: [
                    MytryService
                ]
            })
            .overrideTemplate(MytryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MytryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MytryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Mytry('123');
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.mytry = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mytryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Mytry();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.mytry = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mytryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

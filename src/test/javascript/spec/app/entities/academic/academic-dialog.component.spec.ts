/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PlacementTestModule } from '../../../test.module';
import { AcademicDialogComponent } from '../../../../../../main/webapp/app/entities/academic/academic-dialog.component';
import { AcademicService } from '../../../../../../main/webapp/app/entities/academic/academic.service';
import { Academic } from '../../../../../../main/webapp/app/entities/academic/academic.model';

describe('Component Tests', () => {

    describe('Academic Management Dialog Component', () => {
        let comp: AcademicDialogComponent;
        let fixture: ComponentFixture<AcademicDialogComponent>;
        let service: AcademicService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [AcademicDialogComponent],
                providers: [
                    AcademicService
                ]
            })
            .overrideTemplate(AcademicDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AcademicDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AcademicService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Academic('123');
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.academic = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'academicListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Academic();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.academic = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'academicListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

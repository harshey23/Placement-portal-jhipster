/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PlacementTestModule } from '../../../test.module';
import { ApplicantDialogComponent } from '../../../../../../main/webapp/app/entities/applicant/applicant-dialog.component';
import { ApplicantService } from '../../../../../../main/webapp/app/entities/applicant/applicant.service';
import { Applicant } from '../../../../../../main/webapp/app/entities/applicant/applicant.model';

describe('Component Tests', () => {

    describe('Applicant Management Dialog Component', () => {
        let comp: ApplicantDialogComponent;
        let fixture: ComponentFixture<ApplicantDialogComponent>;
        let service: ApplicantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [ApplicantDialogComponent],
                providers: [
                    ApplicantService
                ]
            })
            .overrideTemplate(ApplicantDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicantDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicantService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Applicant('123');
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.applicant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'applicantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Applicant();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.applicant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'applicantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
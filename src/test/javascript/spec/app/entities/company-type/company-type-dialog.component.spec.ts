/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PlacementTestModule } from '../../../test.module';
import { CompanyTypeDialogComponent } from '../../../../../../main/webapp/app/entities/company-type/company-type-dialog.component';
import { CompanyTypeService } from '../../../../../../main/webapp/app/entities/company-type/company-type.service';
import { CompanyType } from '../../../../../../main/webapp/app/entities/company-type/company-type.model';

describe('Component Tests', () => {

    describe('CompanyType Management Dialog Component', () => {
        let comp: CompanyTypeDialogComponent;
        let fixture: ComponentFixture<CompanyTypeDialogComponent>;
        let service: CompanyTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [CompanyTypeDialogComponent],
                providers: [
                    CompanyTypeService
                ]
            })
            .overrideTemplate(CompanyTypeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyTypeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CompanyType('123');
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.companyType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'companyTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CompanyType();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.companyType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'companyTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

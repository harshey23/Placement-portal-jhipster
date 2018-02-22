/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PlacementTestModule } from '../../../test.module';
import { CompanyTypeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/company-type/company-type-delete-dialog.component';
import { CompanyTypeService } from '../../../../../../main/webapp/app/entities/company-type/company-type.service';

describe('Component Tests', () => {

    describe('CompanyType Management Delete Component', () => {
        let comp: CompanyTypeDeleteDialogComponent;
        let fixture: ComponentFixture<CompanyTypeDeleteDialogComponent>;
        let service: CompanyTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [CompanyTypeDeleteDialogComponent],
                providers: [
                    CompanyTypeService
                ]
            })
            .overrideTemplate(CompanyTypeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete('123');
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith('123');
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

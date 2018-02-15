/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PlacementTestModule } from '../../../test.module';
import { OfferDetailComponent } from '../../../../../../main/webapp/app/entities/offer/offer-detail.component';
import { OfferService } from '../../../../../../main/webapp/app/entities/offer/offer.service';
import { Offer } from '../../../../../../main/webapp/app/entities/offer/offer.model';

describe('Component Tests', () => {

    describe('Offer Management Detail Component', () => {
        let comp: OfferDetailComponent;
        let fixture: ComponentFixture<OfferDetailComponent>;
        let service: OfferService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [OfferDetailComponent],
                providers: [
                    OfferService
                ]
            })
            .overrideTemplate(OfferDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Offer('123')));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.offer).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

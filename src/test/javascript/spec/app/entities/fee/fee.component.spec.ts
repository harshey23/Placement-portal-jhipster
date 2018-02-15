/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PlacementTestModule } from '../../../test.module';
import { FeeComponent } from '../../../../../../main/webapp/app/entities/fee/fee.component';
import { FeeService } from '../../../../../../main/webapp/app/entities/fee/fee.service';
import { Fee } from '../../../../../../main/webapp/app/entities/fee/fee.model';

describe('Component Tests', () => {

    describe('Fee Management Component', () => {
        let comp: FeeComponent;
        let fixture: ComponentFixture<FeeComponent>;
        let service: FeeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [FeeComponent],
                providers: [
                    FeeService
                ]
            })
            .overrideTemplate(FeeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FeeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FeeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Fee('123')],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fees[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

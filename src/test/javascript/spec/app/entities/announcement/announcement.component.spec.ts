/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PlacementTestModule } from '../../../test.module';
import { AnnouncementComponent } from '../../../../../../main/webapp/app/entities/announcement/announcement.component';
import { AnnouncementService } from '../../../../../../main/webapp/app/entities/announcement/announcement.service';
import { Announcement } from '../../../../../../main/webapp/app/entities/announcement/announcement.model';

describe('Component Tests', () => {

    describe('Announcement Management Component', () => {
        let comp: AnnouncementComponent;
        let fixture: ComponentFixture<AnnouncementComponent>;
        let service: AnnouncementService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlacementTestModule],
                declarations: [AnnouncementComponent],
                providers: [
                    AnnouncementService
                ]
            })
            .overrideTemplate(AnnouncementComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnnouncementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnnouncementService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Announcement('123')],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.announcements[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});

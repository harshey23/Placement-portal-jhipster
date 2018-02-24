import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Announcement } from './announcement.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AnnouncementService {

    private resourceUrl =  SERVER_API_URL + 'api/announcements';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(announcement: Announcement): Observable<Announcement> {
        const copy = this.convert(announcement);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(announcement: Announcement): Observable<Announcement> {
        const copy = this.convert(announcement);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<Announcement> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Announcement1.
     */
    private convertItemFromServer(json: any): Announcement {
        const entity: Announcement = Object.assign(new Announcement(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Announcement1 to a JSON which can be sent to the server.
     */
    private convert(announcement: Announcement): Announcement {
        const copy: Announcement = Object.assign({}, announcement);
        copy.date = this.dateUtils
            .convertLocalDateToServer(announcement.date);
        return copy;
    }
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Mytry } from './mytry.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MytryService {

    private resourceUrl =  SERVER_API_URL + 'api/mytries';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(mytry: Mytry): Observable<Mytry> {
        const copy = this.convert(mytry);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(mytry: Mytry): Observable<Mytry> {
        const copy = this.convert(mytry);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<Mytry> {
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
     * Convert a returned JSON object to Mytry.
     */
    private convertItemFromServer(json: any): Mytry {
        const entity: Mytry = Object.assign(new Mytry(), json);
        entity.ld = this.dateUtils
            .convertLocalDateFromServer(json.ld);
        entity.inst = this.dateUtils
            .convertDateTimeFromServer(json.inst);
        entity.zdt = this.dateUtils
            .convertDateTimeFromServer(json.zdt);
        return entity;
    }

    /**
     * Convert a Mytry to a JSON which can be sent to the server.
     */
    private convert(mytry: Mytry): Mytry {
        const copy: Mytry = Object.assign({}, mytry);
        copy.ld = this.dateUtils
            .convertLocalDateToServer(mytry.ld);

        copy.inst = this.dateUtils.toDate(mytry.inst);

        copy.zdt = this.dateUtils.toDate(mytry.zdt);
        return copy;
    }
}

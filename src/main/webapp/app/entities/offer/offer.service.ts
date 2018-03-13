import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Offer } from './offer.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OfferService {

    private resourceUrl =  SERVER_API_URL + 'api/offers';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(offer: Offer): Observable<Offer> {
        const copy = this.convert(offer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(offer: Offer): Observable<Offer> {
        const copy = this.convert(offer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<Offer> {
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
     * Convert a returned JSON object to Offer.
     */
    private convertItemFromServer(json: any): Offer {
        const entity: Offer = Object.assign(new Offer(), json);
        entity.dateOfVisit = this.dateUtils
            .convertLocalDateFromServer(json.dateOfVisit);
        entity.lastDate = this.dateUtils
            .convertDateTimeFromServer(json.lastDate);
        return entity;
    }

    /**
     * Convert a Offer to a JSON which can be sent to the server.
     */
    private convert(offer: Offer): Offer {
        const copy: Offer = Object.assign({}, offer);
        copy.dateOfVisit = this.dateUtils
            .convertLocalDateToServer(offer.dateOfVisit);

        copy.lastDate = this.dateUtils.toDate(offer.lastDate);
        return copy;
    }
}

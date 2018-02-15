import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Fee } from './fee.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FeeService {

    private resourceUrl =  SERVER_API_URL + 'api/fees';

    constructor(private http: Http) { }

    create(fee: Fee): Observable<Fee> {
        const copy = this.convert(fee);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fee: Fee): Observable<Fee> {
        const copy = this.convert(fee);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<Fee> {
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
     * Convert a returned JSON object to Fee.
     */
    private convertItemFromServer(json: any): Fee {
        const entity: Fee = Object.assign(new Fee(), json);
        return entity;
    }

    /**
     * Convert a Fee to a JSON which can be sent to the server.
     */
    private convert(fee: Fee): Fee {
        const copy: Fee = Object.assign({}, fee);
        return copy;
    }
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RoundType } from './round-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RoundTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/round-types';

    constructor(private http: Http) { }

    create(roundType: RoundType): Observable<RoundType> {
        const copy = this.convert(roundType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(roundType: RoundType): Observable<RoundType> {
        const copy = this.convert(roundType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<RoundType> {
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
     * Convert a returned JSON object to RoundType.
     */
    private convertItemFromServer(json: any): RoundType {
        const entity: RoundType = Object.assign(new RoundType(), json);
        return entity;
    }

    /**
     * Convert a RoundType to a JSON which can be sent to the server.
     */
    private convert(roundType: RoundType): RoundType {
        const copy: RoundType = Object.assign({}, roundType);
        return copy;
    }
}

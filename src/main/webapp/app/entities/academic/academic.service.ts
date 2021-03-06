import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Academic } from './academic.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AcademicService {

    private resourceUrl =  SERVER_API_URL + 'api/academics';

    constructor(private http: Http) { }

    create(academic: Academic): Observable<Academic> {
        const copy = this.convert(academic);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(academic: Academic): Observable<Academic> {
        const copy = this.convert(academic);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<Academic> {
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
     * Convert a returned JSON object to Academic.
     */
    private convertItemFromServer(json: any): Academic {
        const entity: Academic = Object.assign(new Academic(), json);
        return entity;
    }

    /**
     * Convert a Academic to a JSON which can be sent to the server.
     */
    private convert(academic: Academic): Academic {
        const copy: Academic = Object.assign({}, academic);
        return copy;
    }
}

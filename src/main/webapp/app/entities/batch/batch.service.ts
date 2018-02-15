import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Batch } from './batch.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BatchService {

    private resourceUrl =  SERVER_API_URL + 'api/batches';

    constructor(private http: Http) { }

    create(batch: Batch): Observable<Batch> {
        const copy = this.convert(batch);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(batch: Batch): Observable<Batch> {
        const copy = this.convert(batch);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<Batch> {
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
     * Convert a returned JSON object to Batch.
     */
    private convertItemFromServer(json: any): Batch {
        const entity: Batch = Object.assign(new Batch(), json);
        return entity;
    }

    /**
     * Convert a Batch to a JSON which can be sent to the server.
     */
    private convert(batch: Batch): Batch {
        const copy: Batch = Object.assign({}, batch);
        return copy;
    }
}

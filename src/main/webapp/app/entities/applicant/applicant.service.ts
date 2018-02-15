import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Applicant } from './applicant.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ApplicantService {

    private resourceUrl =  SERVER_API_URL + 'api/applicants';

    constructor(private http: Http) { }

    create(applicant: Applicant): Observable<Applicant> {
        const copy = this.convert(applicant);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(applicant: Applicant): Observable<Applicant> {
        const copy = this.convert(applicant);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<Applicant> {
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
     * Convert a returned JSON object to Applicant.
     */
    private convertItemFromServer(json: any): Applicant {
        const entity: Applicant = Object.assign(new Applicant(), json);
        return entity;
    }

    /**
     * Convert a Applicant to a JSON which can be sent to the server.
     */
    private convert(applicant: Applicant): Applicant {
        const copy: Applicant = Object.assign({}, applicant);
        return copy;
    }
}

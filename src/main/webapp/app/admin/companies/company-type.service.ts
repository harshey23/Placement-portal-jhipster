import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CompanyType } from './company-type.model';
import { ResponseWrapper } from '../../shared';

@Injectable()
export class CompanyTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/company-types';

    constructor(private http: Http) { }

    create(companyType: CompanyType): Observable<CompanyType> {
        const copy = this.convert(companyType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(companyType: CompanyType): Observable<CompanyType> {
        const copy = this.convert(companyType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<CompanyType> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl)
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
     * Convert a returned JSON object to CompanyType.
     */
    private convertItemFromServer(json: any): CompanyType {
        const entity: CompanyType = Object.assign(new CompanyType(), json);
        return entity;
    }

    /**
     * Convert a CompanyType to a JSON which can be sent to the server.
     */
    private convert(companyType: CompanyType): CompanyType {
        const copy: CompanyType = Object.assign({}, companyType);
        return copy;
    }
}

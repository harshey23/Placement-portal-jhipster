import { Injectable } from '@angular/core';
// import { Headers, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import 'rxjs/add/operator/toPromise';    
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Company } from './company';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CompanyService {

    private companyUrl = 'api/companies';  // URL to web api

    constructor(private http: HttpClient) { }

    /** GET heroes from the server */
    getCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(this.companyUrl)
            .pipe(
            tap(heroes => this.log(`fetched heroes`)),
            catchError(this.handleError('getCompanies', []))
            );
    }

    /** GET hero by id. Return `undefined` when id not found */
    getCompany<Data>(id: number): Observable<Company> {
        const url = `${this.companyUrl}/?id=${id}`;
        return this.http.get<Company[]>(url)
            .pipe(
                map(heroes => heroes[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} hero id=${id}`);
                }),
                catchError(this.handleError<Company>(`getCompany id=${id}`))
            );
    }

    /* GET heroes whose name contains search term */
    searchCompany(term: string): Observable<Company[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Company[]>(`api/companies/?name=${term}`).pipe(
            tap(_ => this.log(`found heroes matching "${term}"`)),
            catchError(this.handleError<Company[]>('searchCompany', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new hero to the server */
    addCompany(company: Company): Observable<Company> {
        return this.http.post<Company>(this.companyUrl, company, httpOptions).pipe(
            tap((company: Company) => this.log(`added company w/ id=${company.id}`)),
            catchError(this.handleError<Company>('addCompany'))
        );
    }

    /** POST: add a new hero to the server */
    create(company: any): Observable<Company> {
        return this.http.post<Company>(this.companyUrl, company, httpOptions).pipe(
            tap((company: Company) => this.log(`added company w/ id=${company.id}`)),
            catchError(this.handleError<Company>('addCompany'))
        );
    }

    /** DELETE: delete the hero from the server */
    deleteCompany(company: Company | number): Observable<Company> {
        const id = typeof company === 'number' ? company : company.id;
        const url = `${this.companyUrl}/${id}`;

        return this.http.delete<Company>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted company id=${id}`)),
            catchError(this.handleError<Company>('deleteCompany'))
        );
    }

    /** PUT: update the hero on the server */
    updateCompany(company: Company): Observable<any> {
        return this.http.put(this.companyUrl, company, httpOptions).pipe(
              tap(_ => this.log(`updated company id=${company.id}`)),
            catchError(this.handleError<any>('updateCompany'))
        );
    }


    // getCompanies(): Promise<Company[]> {
    //     return this.http.get(this.companyUrl)
    //             .toPromise()
    //             .then(response => response.json().data as Company[])
    //             .catch(this.handleError);
    // }
    // getCompany(id: number): Promise<Company> {
    //     const url = `${this.companyUrl}/${id}`;
    //     return this.http.get(url)
    //         .toPromise()
    //         .then(response => response.json().data as Company)
    //         .catch(this.handleError);
    // }
    // create(name: string, contact: string, status: string): Promise<Company> {
    //     return this.http
    //         .post(this.companyUrl, 
    //             JSON.stringify({name: name, contact: contact, status: status}), 
    //             {headers: this.headers})
    //         .toPromise()
    //         .then(res => res.json().data as Company)
    //         .catch(this.handleError);
    // }
    // delete(id: number): Promise<void> {
    //     const url = `${this.companyUrl}/${id}`;
    //     return this.http.delete(url, {headers: this.headers})
    //         .toPromise()
    //         .then(() => null)
    //         .catch(this.handleError);
    // }
    // update(company: Company): Promise<Company> {
    //     const url = `${this.companyUrl}/${company.id}`;
    //     return this.http
    //         .put(url, JSON.stringify(company), { headers: this.headers })
    //         .toPromise()
    //         .then(() => company)
    //         .catch(this.handleError);
    // }

    //     /**
    //  * Handle Http operation that failed.
    //  * Let the app continue.
    //  * @param operation - name of the operation that failed
    //  * @param result - optional value to return as the observable result
    //  */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    // /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log('CompanyService: ' + message);
    }
}

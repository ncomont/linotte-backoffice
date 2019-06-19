import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppSettings } from '../app.settings';
import { AuthenticationService } from './authentication.service';

import { Page } from '../../models/page.model';
import { SearchParameters } from '../../models/search-parameters.model';
import { Taxon } from '../../models/taxon.model';
import { Rank } from '../../models/rank.model';


@Injectable()
export class TaxrefService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService
    ) { }

    getPage(parameters: SearchParameters): Observable<Page<Taxon>> {
        return this.http.post(
            `${AppSettings.TAXON_SEARCH_ENDPOINT}`,
            parameters,
            this.authenticationService.options
        )
            .map(res => res.json())
            .map(this.convertPage)
            .catch(this.handleError.bind(this));
    }

    getRanks(): Observable<Rank[]> {
        return this.http.get(AppSettings.RANK_ENDPOINT, this.authenticationService.options)
            .map(res => res.json())
            .map(res => res.map(r => Rank.Parse(r)))
            .catch(this.handleError.bind(this));
    }

    getByID(id: number): Observable<Taxon> {
        return this.http.get(`${AppSettings.TAXON_ENDPOINT}/${id}`, this.authenticationService.options)
            .map(res => Taxon.Parse(res.json()))
            .catch(this.handleError.bind(this));
    }

    getByIDs(ids: number[]): Observable<Taxon[]> {
        return this.http.post(
            `${AppSettings.TAXON_SEARCH_ENDPOINT}`,
            new SearchParameters({ids}),
            this.authenticationService.options
        )
            .map(res => res.json())
            .map(res => res.map(r => Taxon.Parse(r)))
            .catch(this.handleError.bind(this));
    }

    getReferenceAndSynonymsForID(id: number): Observable<Taxon[]> {
        return this.http.get(`${AppSettings.TAXON_REFERENCE_AND_SYNONYMS_ENDPOINT}/${id}`, this.authenticationService.options)
            .map(res => res.json())
            .map(res => res.map(r => Taxon.Parse(r)))
            .catch(this.handleError.bind(this));
    }

    getTaxonomicClassificationForID(id: number, depth: number): Observable<Taxon> {
        return this.http.get(`${AppSettings.TAXON_TAXONOMIC_CLASSIFICATION_ENDPOINT}/${id}/${depth}`, this.authenticationService.options)
            .map(res => Taxon.Parse(res.json()))
            .catch(this.handleError.bind(this));
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            if (error.status === 401) {
                this.authenticationService.logout();
                return Observable.throw('Not logged in');
            } else {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    private convertPage(json) {
        let page = new Page<Taxon>(json);
        page.items = json.results ? json.results.map(raw => Taxon.Parse(raw)) : [];
        return page;
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppSettings } from '../../shared/app.settings';
import { AuthenticationService } from './authentication.service';

import { JobReport } from '../../models/job-report.model';
import { JobResult, JobResultState } from '../../models/job-result.model';


@Injectable()
export class JobReportService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService
    ) { }

    getByID(id: number): Observable<JobReport> {
        return this.http.get(`${AppSettings.JOB_REPORT_ENDPOINT}/${id}`, this.authenticationService.options)
            .map(res => res.json())
            .map(res => JobReport.Parse(res))
            .catch(this.handleError.bind(this));
    }

    getResultsByState(reportId: number, state: JobResultState): Observable<JobResult[]> {
        return this.http.get(`${AppSettings.JOB_RESULTS_ENDPOINT}/${reportId}/${state}`, this.authenticationService.options)
            .map(res => res.json())
            .map(res => (res || []).map(r => JobResult.Parse(r)))
            .catch(this.handleError.bind(this));
    }

    resolveConflict(conflict: JobResult): Observable<JobResult> {
        let temp = {
            actualState: conflict.state,
            newState: JobResultState.RESOLVED,
            conflictId: conflict.id,
            taxonId: conflict.taxon.id,
        };

        return this.http.put(`${AppSettings.JOB_RESULTS_ENDPOINT}`, temp, this.authenticationService.options)
            .map(res => res.json())
            .map(res => JobResult.Parse(res))
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
}

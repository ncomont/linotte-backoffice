import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppSettings } from '../../shared/app.settings';
import { AuthenticationService } from './authentication.service';

import { Job, JobStatus } from '../../models/job.model';
import { JobReport } from '../../models/job-report.model';


@Injectable()
export class JobService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService
    ) { }

    getAll(): Observable<Job[]> {
        return this.http.get(AppSettings.JOB_ENDPOINT, this.authenticationService.options)
            .map(res => res.json())
            .map(res => res.map(r => Job.Parse(r)))
            .catch(this.handleError.bind(this));
    }

    getById(id: number): Observable<Job> {
        return this.http.get(`${AppSettings.JOB_ENDPOINT}/${id}`, this.authenticationService.options)
            .map(res => Job.Parse(res.json()))
            .catch(this.handleError.bind(this));
    }

    getReports(id: number): Observable<JobReport[]> {
        return this.http.get(`${AppSettings.JOB_REPORTS_ENDPOINT}/${id}`, this.authenticationService.options)
            .map(res => res.json())
            .map(res => res.map(r => JobReport.Parse(r)))
            .catch(this.handleError.bind(this));
    }

    startJob(job: Job): Observable<Job> {
        if (![JobStatus.NEW, JobStatus.IDLE].includes(job.status)) {
            return Observable.throw('This job cannot be started');
        }

        return this.http.patch(
                `${AppSettings.JOB_ENDPOINT}`,
                {...job, status: JobStatus.STACKED},
                this.authenticationService.options
            )
            .map(res => Job.Parse(res.json()))
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

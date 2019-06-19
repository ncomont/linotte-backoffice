import { Component, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaxrefService } from '../../shared/services/taxref.service';
import { JobReportService } from '../../shared/services/job-report.service';
import { EventService } from '../../shared/services/event.service';
import { AppSettings } from '../../shared/app.settings';

import { JobResult, JobResultState } from '../../models/job-result.model';


@Component({
    selector: 'job-results',
    templateUrl: './job-results.component.html'
})


export class JobResultsComponent {
    private fetching: boolean;
    private refreshEmitter: EventEmitter<any>;

    private _results: JobResult[];
    private _reportId: number;
    private _state: JobResultState;


    constructor(
        private jobReportService: JobReportService,
        private taxrefService: TaxrefService,
        private eventService: EventService,
        private router: Router,
        private route: ActivatedRoute) {
        this._results = [];
    }

    ngOnInit() {
        this.refreshEmitter = this.eventService.createEmitter(AppSettings.REFRESH_RESULTS_EVENT)
            .subscribe(() => this.getResults());
    }

    ngOnDestroy() {
        this.refreshEmitter.unsubscribe();
    }

    resolve(result: JobResult) {
        this.eventService.emit(AppSettings.SHOW_TAXON_RESOLVER_EVENT, result);
    }

    getResults() {
        this._results = [];
        this.fetching = true;

        this.jobReportService.getResultsByState(this._reportId, this._state)
            .subscribe(
            results => {
                this._results = results;
                this.fetching = false;
            },
            error => console.error('[NC]: ', error)
            );
    }

    @Input() set reportId(id: number) {
        if (id) {
            this._reportId = id;
            if (this._state) {
                this.getResults();
            }
        }
    }

    @Input() set state(state: JobResultState) {
        if (state) {
            this._state = state;
            if (this._reportId) {
                this.getResults();
            }
        }
    }

    get state() {
        return this._state;
    }

    get results() {
        return this._results.filter(r => r.state === this.state);
    }
}

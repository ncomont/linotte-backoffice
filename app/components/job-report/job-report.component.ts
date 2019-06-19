import { Component, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JobReportService } from '../../shared/services/job-report.service';
import { EventService } from '../../shared/services/event.service';
import { AppSettings } from '../../shared/app.settings';

import { JobReport } from '../../models/job-report.model';
import { JobResult, JobResultState } from '../../models/job-result.model';

import { ConflictResolverComponent } from '../conflict-resolver/conflict-resolver.component';

declare var $: any;


@Component({
    selector: 'job-report',
    templateUrl: './job-report.component.html'
})


export class JobReportComponent {
    @ViewChild(ConflictResolverComponent) conflictResolver: ConflictResolverComponent;

    private report: JobReport;
    private selectedState: JobResultState;
    private conflict: JobResult;
    private fetching: boolean;
    private resolveEmitter: EventEmitter<any>;
    private showResolverEmitter: EventEmitter<any>;
    private stateFilterEmitter: EventEmitter<any>;

    constructor(
        private jobReportService: JobReportService,
        private eventService: EventService,
        private router: Router,
        private route: ActivatedRoute) {
        this.report = new JobReport();
        this.fetching = true;

        this.selectedState = JobResultState.GetDefaultState();
    }

    ngOnInit() {
        this.showResolverEmitter = this.eventService.createEmitter(AppSettings.SHOW_TAXON_RESOLVER_EVENT)
            .subscribe(conflict => {
                this.conflict = conflict;
                this.conflictResolver.show(this.getCriteria(conflict.searchData));
            });

        this.resolveEmitter = this.eventService.createEmitter(AppSettings.RESOLVE_TAXON_EVENT)
            .subscribe(t => {
                this.fetching = true;
                this.jobReportService.resolveConflict(t)
                    .subscribe(
                    conflict => {
                        this.conflict.state = conflict.state;
                        this.conflict.taxon = conflict.taxon;
                        this.fetching = false;
                    },
                    error => console.error('[NC]: ', error)
                    );
            });

        this.stateFilterEmitter = this.eventService.createEmitter(AppSettings.STATE_FILTER_CHANGE_EVENT)
            .subscribe(s => this.selectedState = s);

        this.route.params
            .map(params => +params['id'])
            .subscribe((id) => {
                this.jobReportService.getByID(id)
                    .subscribe(
                    report => {
                        this.report = report;
                        this.fetching = false;
                    },
                    error => console.error('[NC]: ', error)
                    );
            });
    }

    ngOnDestroy() {
        this.resolveEmitter.unsubscribe();
        this.showResolverEmitter.unsubscribe();
        this.stateFilterEmitter.unsubscribe();
    }

    getCriteria(data: any) {
        for (let k in data) {
            if (data[k]) {
                return data[k];
            }
        }
    }
}

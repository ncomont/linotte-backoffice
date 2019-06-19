import { Component, Input } from '@angular/core';

import { JobService } from '../../shared/services/job.service';

import { Job } from '../../models/job.model';
// import { JobReport } from '../../models/job-report.model';

@Component({
    selector: 'job-excerpt',
    templateUrl: './job-excerpt.component.html'
})

export class JobExcerptComponent {
    private job: Job;
    private fetching: boolean;

    constructor(
        private jobService: JobService
    ) {
        this.job = new Job();
    }

    @Input() set jobId(id: number) {
        if (id) {
            this.fetching = true;
            this.jobService.getById(id)
                .subscribe(
                job => {
                    this.job = job;
                    this.fetching = false;
                },
                error => console.error('[NC]: ', error)
                );
        }
    }
}

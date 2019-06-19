import { Component } from '@angular/core';

import { Job, JobStatus } from '../../models/job.model';

import { JobService } from '../../shared/services/job.service';


@Component({
    selector: 'jobs',
    templateUrl: './jobs.component.html'
})

export class JobsComponent {
    private jobs: Job[];


    constructor(
        private jobService: JobService
    ) {
        this.jobs = [];
    }

    ngOnInit() {
        this.jobService.getAll()
            .subscribe(
                jobs => this.jobs = jobs,
                error => console.error('[NC]: ', error)
            );
    }

    start(job: Job) {
        this.jobService.startJob(job)
            .subscribe(
                res => this.jobs.find(j => j.id === job.id).status = res.status,
                error => console.error('[NC]: ', error)
            );
    }

    get newJobsCount() {
        return this.jobs.filter(j => j.status === JobStatus.NEW).length;
    }

    get pendingJobsCount() {
        return this.jobs.filter(j => j.status === JobStatus.PENDING).length;
    }

    get archivedJobsCount() {
        return this.jobs.filter(j => j.status === JobStatus.ARCHIVED).length;
    }

    get idleJobsCount() {
        return this.jobs.filter(j => j.status === JobStatus.IDLE).length;
    }
}

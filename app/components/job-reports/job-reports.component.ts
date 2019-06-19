import { Component, Input } from '@angular/core';

import { JobReport, JobReportStatus } from '../../models/job-report.model';


@Component({
    selector: 'job-reports',
    templateUrl: './job-reports.component.html'
})

export class JobReportsComponent {
    @Input() reports: JobReport[];

    getStatusClasses(report: JobReport) {
        switch (report.status) {
            case JobReportStatus.WARNING:
                return {
                    color: 'orange',
                };
            case JobReportStatus.ERROR:
                return {
                    color: 'red'
                };
        }
        return {
            color: 'green'
        };
    }
}

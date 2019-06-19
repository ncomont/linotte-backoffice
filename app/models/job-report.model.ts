import { JobResult } from './job-result.model';

export class JobReportStatus {
    static PASSED = 'PASSED';
    static WARNING = 'WARNING';
    static ERROR = 'ERROR';
}

export class JobReport {
    id: number;
    creationDate: Date;
    message: string;
    status: string;
    results: JobResult[];

    public static Parse(json: any): JobReport {
        return new JobReport({
            id: json.id,
            jobId: json.job_id,
            creationDate: json.creation_date.seconds,
            message: json.message,
            status: json.status,
        });
    }

    public constructor(init?) {
        Object.assign(this, init);
    }

    get hasError() {
        return this.status === JobReportStatus.ERROR;
    }

    get hasWarning() {
        return this.status === JobReportStatus.WARNING;
    }
}

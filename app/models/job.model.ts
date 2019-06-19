import { JobReport } from './job-report.model';

export class JobType {
    static RED_LIST = 'RL';
    static ZNIEFF = 'ZN';
    static STATUS = 'ST';
}

export class JobStatus {
    static NEW = 'NEW';
    static STACKED = 'STACKED';
    static PENDING = 'PENDING';
    static ARCHIVED = 'ARCHIVED';
    static IDLE = 'IDLE';
}

export class Job {
    id: number;
    name: string;
    file: string;
    redListId: number;
    lastUpdate: Date;
    status: string;
    type: string;
    reports: JobReport[];

    public static Parse(json: any): Job {
        return new Job({
            id: json.id,
            name: json.name,
            file: json.file,
            redListId: json.red_list_id,
            lastUpdate: json.last_update ? json.last_update.seconds : 0,
            status: json.status,
            type: json.type,
            reports: json.reports ? json.reports.map(r => JobReport.Parse(r)) : []
        });
    }

    public constructor(init?) {
        Object.assign(this, init);
    }

    get isRedList() {
        return this.type === JobType.RED_LIST;
    }

    get isZnieff() {
        return this.type === JobType.ZNIEFF;
    }

    get isStatus() {
        return this.type === JobType.STATUS;
    }

    get isPending() {
        return [JobStatus.PENDING, JobStatus.STACKED].includes(this.status);
    }
}

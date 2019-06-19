import { Taxon } from './taxon.model';

export class JobResultState {
    static FOUND = 'FOUND';
    static NOT_FOUND = 'NOT_FOUND';
    static RESOLVED = 'RESOLVED';

    public static GetDefaultState(): JobResultState {
        return JobResultState.NOT_FOUND;
    }
}

export class JobResult {
    id: number;
    searchData: any;
    taxon: Taxon;
    taxonId: number;
    state: JobResultState;
    value: string;

    public static Parse(json: any): JobResult {
        return new JobResult({
            id: json.id,
            searchData: JSON.parse(json.search_data),
            taxon: json.taxon ? Taxon.Parse(json.taxon) : null,
            taxonId: json.taxon_id,
            state: json.state,
            value: json.value
        });
    }

    public constructor(init?) {
        Object.assign(this, init);
    }
}

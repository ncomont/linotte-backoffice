export class SearchParameters {
    id: number;
    ranks: string[];
    term: string;
    reference: boolean;
    offset: number;
    limit: number;
    ids: number[];

    constructor(params?) {
        if (params) {
            Object.assign(this, params);
        }
    }
}

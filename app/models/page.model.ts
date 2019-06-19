export class Page<T> {
    offset: number;
    limit: number;
    total: number;
    items: T[];

    constructor(json?: any) {
        this.offset = json ? json.offset : 1;
        this.limit = json ? json.limit : 0;
        this.total = json ? json.total : 0;
    }
}

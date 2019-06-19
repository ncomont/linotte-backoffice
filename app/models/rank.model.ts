export class Rank {
    id: number;
    key: string;

    public static Parse(json: any): Rank {
        return new Rank({
            id: json.id,
            key: json.key
        });
    }

    public constructor(init?) {
        Object.assign(this, init);
    }
}

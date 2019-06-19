export class Taxon {
    id: number;
    rank: string;
    author: string;
    name: string;
    vernacularName: string;
    firstLevelVernacularGroup: string;
    secondLevelVernacularGroup: string;
    parent: Taxon;
    referenceId: number;
    hasParent: boolean;

    public static Parse(json: any): Taxon {
        return new Taxon({
            id: json.id,
            rank: json.rank.key,
            author: json.author,
            name: json.name,
            vernacularName: json.vernacular_names && json.vernacular_names.join(', '),
            firstLevelVernacularGroup: json.first_level_vernacular_group,
            secondLevelVernacularGroup: json.second_level_vernacular_group,
            parent: json.parent && Taxon.Parse(json.parent),
            referenceId: json.reference_id,
            hasParent: json.parentId !== 0
        });
    }

    public constructor(init?) {
        Object.assign(this, init);
    }
}

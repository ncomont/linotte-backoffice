import { Component, Input } from '@angular/core';

import { AppSettings } from '../../shared/app.settings';
import { TaxrefService } from '../../shared/services/taxref.service';

import { Taxon } from '../../models/taxon.model';


@Component({
    selector: 'taxonomic-classification',
    templateUrl: './taxonomic-classification.component.html',
    styleUrls: ['./taxonomic-classification.component.scss']
})

export class TaxonomicClassificationComponent {
    private taxons: Taxon[];
    private _depth: number;
    private _taxonId: number;

    constructor(
        private taxrefService: TaxrefService
    ) {
        this.depth = AppSettings.DEFAULT_TAXONOMIC_CLASSIFICATION_DEPTH;
        this.taxons = [];
    }

    buildTree(taxon: Taxon) {
        this.taxons = [taxon];

        while (taxon.parent) {
            this.taxons.push(taxon.parent);
            taxon = taxon.parent;
        }

        this.taxons = this.taxons.reverse();
    }

    updateClassification() {
        if (this.taxonId && this.depth) {
            this.taxrefService.getTaxonomicClassificationForID(this.taxonId, this.depth)
                .subscribe(
                taxon => this.buildTree(taxon),
                error => console.error('[NC]: ', error)
                );
        }
    }

    setDepth(depth: number) {
        if (depth > 0) {
            this.depth = depth;
        }
    }

    hasParent() {
        return this.taxons[0] && !this.taxons[0].hasParent;
    }

    @Input() set taxonId(id: number) {
        if (id) {
            this._taxonId = id;
            this.updateClassification();
        }
    }

    @Input() set depth(depth: number) {
        if (depth) {
            this._depth = depth;
            this.updateClassification();
        }
    }

    get taxonId() {
        return this._taxonId;
    }

    get depth() {
        return this._depth;
    }
}

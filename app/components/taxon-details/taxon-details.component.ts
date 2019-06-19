import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaxrefService } from '../../shared/services/taxref.service';

import { Taxon } from '../../models/taxon.model';


@Component({
    selector: 'taxon-details',
    templateUrl: './taxon-details.component.html',
    styleUrls: ['./taxon-details.component.scss']
})

export class TaxonDetailsComponent {
    private reference: Taxon;
    private synonyms: Taxon[];

    constructor(
        private taxrefService: TaxrefService,
        private router: Router,
        private route: ActivatedRoute) {
        this.reference = new Taxon();
    }

    ngOnInit() {
        this.route.params
            .map(params => +params['id'])
            .subscribe((id) => {
                this.taxrefService.getReferenceAndSynonymsForID(id)
                    .subscribe(
                    taxons => {
                        this.reference = taxons.find(t => t.id === t.referenceId);
                        this.synonyms = taxons.filter(t => t.id !== t.referenceId);
                    },
                    error => console.error('[NC]: ', error)
                    );
            });
    }
}

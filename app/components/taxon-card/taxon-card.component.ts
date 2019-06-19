import { Component, Input } from '@angular/core';

import { Taxon } from '../../models/taxon.model';

@Component({
    selector: 'taxon-card',
    templateUrl: './taxon-card.component.html',
    host: { 'class': 'ui card' }
})

export class TaxonCardComponent {
    @Input() taxon: Taxon;
}

import { Component, Input } from '@angular/core';

import { Taxon } from '../../models/taxon.model';
//
import { EventService } from '../../shared/services/event.service';
import { AppSettings } from '../../shared/app.settings';


@Component({
    selector: 'taxon-list',
    templateUrl: './taxon-list.component.html',
    styleUrls: ['./taxon-list.component.scss']
})

export class TaxonListComponent {
    @Input() taxons: Taxon[];
    @Input() hideHeader: boolean;

    constructor(
        private eventService: EventService
    ) { }

    click(taxon: Taxon) {
        this.eventService.emit(AppSettings.SELECT_TAXON_EVENT, taxon);
    }
}

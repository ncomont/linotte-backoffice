import { Component, Input } from '@angular/core';
import { SemanticComponent } from '../semantic.component';

import { EventService } from '../../shared/services/event.service';
import { TaxrefService } from '../../shared/services/taxref.service';
import { AppSettings } from '../../shared/app.settings';

import { SearchParameters } from '../../models/search-parameters.model';
import { Rank } from '../../models/rank.model';

@Component({
    selector: 'search',
    templateUrl: './search.component.html'
})

export class SearchComponent extends SemanticComponent {
    @Input() restrictToReferenceTaxon: boolean;

    private timer: any;
    private ranks: Rank[];
    private _search: SearchParameters;

    constructor(
        private eventService: EventService,
        private taxrefService: TaxrefService
    ) {
        super();
        this._search = new SearchParameters();
    }

    ngOnInit() {
        this.taxrefService.getRanks()
            .subscribe(
            ranks => this.ranks = ranks,
            error => console.error('[NC]: ', error)
            );
    }

    private hit() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.eventService.emit(AppSettings.SEARCH_EVENT, this._search);
        }, AppSettings.SEARCH_TIMER_VALUE);
    }

    set term(t: string) {
        this._search.term = t;
        this.hit();
    }

    get term() {
        return this._search.term;
    }

    set selectedRank(ranks: string[]) {
        this._search.ranks = ranks;
        this.hit();
    }

    set referenceOnly(ref: boolean) {
        this._search.reference = ref;
        this.hit();
    }

    @Input() set initWithTerm(term: string) {
        if (term) {
            this.term = term;
        }
    }
}

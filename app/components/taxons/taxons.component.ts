import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SearchParameters } from '../../models/search-parameters.model';
import { Page } from '../../models/page.model';
import { Taxon } from '../../models/taxon.model';

import { TaxrefService } from '../../shared/services/taxref.service';
import { EventService } from '../../shared/services/event.service';
import { AppSettings } from '../../shared/app.settings';


@Component({
    selector: 'taxons',
    templateUrl: './taxons.component.html'
})

export class TaxonsComponent {
    private page: Page<Taxon>;
    private currentSearch: SearchParameters;
    private fetching: boolean;
    private searchEmitter: EventEmitter<any>;
    private pageEmitter: EventEmitter<any>;
    private selectEmitter: EventEmitter<any>;
    private serviceSubscription: Subscription;

    constructor(
        private taxrefService: TaxrefService,
        private eventService: EventService,
        private router: Router
    ) {
        this.page = new Page<Taxon>();
        this.currentSearch = null;
        this.fetching = true;
    }

    ngOnInit() {
        this.getTaxons(1);
        this.pageEmitter = this.eventService.createEmitter(AppSettings.PAGE_EVENT)
            .subscribe(page => this.getTaxons(page, this.currentSearch));
        this.selectEmitter = this.eventService.createEmitter(AppSettings.SELECT_TAXON_EVENT)
            .subscribe(t => this.router.navigate(['/taxon-details', t.id]));
        this.searchEmitter = this.eventService.createEmitter(AppSettings.SEARCH_EVENT)
            .subscribe(p => {
                this.currentSearch = p;
                this.getTaxons(1, p);
            });
    }

    ngOnDestroy() {
        this.pageEmitter.unsubscribe();
        this.searchEmitter.unsubscribe();
        this.selectEmitter.unsubscribe();
    }

    getTaxons(pageNumber: number, parameters?: SearchParameters) {
        this.fetching = true;
        if (this.serviceSubscription) {
            this.serviceSubscription.unsubscribe();
        }

        this.serviceSubscription = this.taxrefService.getPage(
            {
                ...parameters,
                offset: pageNumber,
                limit: AppSettings.PAGE_SIZE,
            })
            .subscribe(
            page => {
                this.page = page;
                this.fetching = false;
            },
            error => console.error('[NC]: ', error)
            );
    }
}

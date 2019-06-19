import { Component, Input, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SemanticComponent } from '../semantic.component';

import { SearchParameters } from '../../models/search-parameters.model';
import { Taxon } from '../../models/taxon.model';
import { JobResult } from '../../models/job-result.model';

import { TaxrefService } from '../../shared/services/taxref.service';
import { EventService } from '../../shared/services/event.service';
import { AppSettings } from '../../shared/app.settings';


declare var $: any;


@Component({
    selector: 'conflict-resolver',
    templateUrl: './conflict-resolver.component.html',
    styleUrls: ['./conflict-resolver.component.scss'],
    host: { 'class': 'ui modal' }
})

export class ConflictResolverComponent extends SemanticComponent {
    @Input() conflict: JobResult;

    private initialTerm: string;
    private results: Taxon[];
    private selectedTaxon: Taxon;
    private fetching: boolean;
    private searchEmitter: EventEmitter<any>;
    private selectEmitter: EventEmitter<any>;
    private serviceSubscription: Subscription;

    constructor(
        private taxrefService: TaxrefService,
        private eventService: EventService,
    ) {
        super();
        this.init();
        this.fetching = true;
    }

    ngOnInit() {
        this.selectEmitter = this.eventService.createEmitter(AppSettings.SELECT_TAXON_EVENT)
            .subscribe(t => this.selectedTaxon = t);
        this.searchEmitter = this.eventService.createEmitter(AppSettings.SEARCH_EVENT)
            .subscribe(p => this.getTaxons(0, p));
    }

    ngOnDestroy() {
        this.searchEmitter.unsubscribe();
        this.selectEmitter.unsubscribe();
    }

    show(term: string) {
        this.initialTerm = term;
        $('conflict-resolver')
            .modal({
                detachable: false,
                onHide: () => this.init()
            })
            .modal('show');
    }

    init() {
        this.results = [];
        this.initialTerm = '';
        this.selectedTaxon = null;
    }

    resolve() {
        this.conflict.taxon = this.selectedTaxon;
        this.eventService.emit(AppSettings.RESOLVE_TAXON_EVENT, this.conflict);
    }

    drop() {
        this.eventService.emit(AppSettings.RESOLVE_TAXON_EVENT, null);
    }

    ngAfterViewChecked() {
        let resolver = $('conflict-resolver');
        if (resolver.modal) {
            resolver.modal({
                detachable: false,
                onHide: () => this.init()
            }).modal('refresh');
        }
    }

    getTaxons(index: number, parameters?: SearchParameters) {
        this.fetching = true;
        if (this.serviceSubscription) {
            this.serviceSubscription.unsubscribe();
        }

        this.serviceSubscription = this.taxrefService.getPage(
            {
                ...parameters,
                limit: AppSettings.CONFLICT_RESOLUTION_PAGE_SIZE,
                offset: index,
            })
            .subscribe(
            page => {
                this.results = page.items;
                this.fetching = false;
            },
            error => console.error('[NC]: ', error)
            );
    }

    getClasses() {
        if (this.selectedTaxon) {
            return {
                button: 'positive'
            };
        }
        return {
            button: 'disabled'
        };
    }
}

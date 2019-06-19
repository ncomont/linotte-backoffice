import { Component, Input } from '@angular/core';

import { EventService } from '../../shared/services/event.service';
import { AppSettings } from '../../shared/app.settings';

@Component({
    selector: 'paginator',
    templateUrl: './paginator.component.html'
})

export class PaginatorComponent {
    @Input() pageSize: number;
    @Input() total: number;

    private currentPage: number;


    constructor(private eventService: EventService) {
        this.pageSize = 0;
        this.total = 0;
        this.currentPage = 1;
    }

    changePage(page: number) {
        if (Number(page) && this.currentPage !== page) {
            this.eventService.emit(AppSettings.PAGE_EVENT, page - 1);
            this.currentPage = page;
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.changePage(this.currentPage - 1);
        }
    }

    nextPage() {
        if (this.currentPage < this.pageCount) {
            this.changePage(this.currentPage + 1);
        }
    }

    get pageCount() {
        return Math.ceil(this.total / this.pageSize);
    }
}

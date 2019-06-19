import { Component } from '@angular/core';

import { EventService } from '../../shared/services/event.service';
import { AppSettings } from '../../shared/app.settings';

import { JobResultState } from '../../models/job-result.model';


@Component({
    selector: 'job-actions',
    templateUrl: './job-actions.component.html'
})


export class JobActionsComponent {
    private state: JobResultState;

    constructor(
        private eventService: EventService
    ) {
        this.state = JobResultState.GetDefaultState();
    }

    selectStateFilter(state: JobResultState) {
        this.state = state;
        this.eventService.emit(AppSettings.STATE_FILTER_CHANGE_EVENT, state);
    }
}

import { Component, Input } from '@angular/core';


@Component({
    selector: 'jobs-statistics',
    templateUrl: './jobs-statistics.component.html'
})

export class JobsStatisticsComponent {
    @Input() new: number;
    @Input() archived: number;
    @Input() idle: number;
    @Input() pending: number;
}

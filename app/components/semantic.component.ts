import { Component } from '@angular/core';

declare var $: any;


@Component({})

export class SemanticComponent {
    ngAfterViewInit() {
        $(document).ready(function() {
            $('select.dropdown').dropdown();
            $('.ui.checkbox').checkbox();
            $('.ui.accordion').accordion();
        });
    }
}

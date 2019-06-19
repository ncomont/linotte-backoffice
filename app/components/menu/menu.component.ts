import { Component } from '@angular/core';

import { AuthenticationService } from '../../shared/services/authentication.service';


@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})

export class MenuComponent {
    constructor(private authenticationService: AuthenticationService) { }

    logout() {
        this.authenticationService.logout();
    }

    get canDisplayMenu() {
        return this.authenticationService.isLoggedIn;
    }
}

import { Component } from '@angular/core';

import { UserService } from '../../shared/services/user.service';
import { User } from '../../models/user.model';


@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    private submitted: boolean;
    private user: User;
    private error: string;

    constructor(
        private userService: UserService,
    ) {
        this.submitted = false;
        this.user = new User();
    }

    onSubmit() {
        this.userService.login(this.user)
            .subscribe(
            success => console.log('[NC] Logged in'),
            error => this.error = error
            );
    }
}

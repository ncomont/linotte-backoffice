import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppSettings } from '../app.settings';


@Injectable()
export class AuthenticationService {
    private _token: string;

    constructor(private router: Router) {
        this._token = localStorage.getItem(AppSettings.LS_TOKEN_KEY);
    }

    login(token: string) {
        if (token && token.length) {
            this._token = token;
            localStorage.setItem(AppSettings.LS_TOKEN_KEY, token);
            this.router.navigate(['/']);
        }
    }

    logout() {
        this._token = '';
        localStorage.removeItem(AppSettings.LS_TOKEN_KEY);
        this.router.navigate(['/login']);
    }

    get isLoggedIn() {
        return this._token && this._token.length > 0;
    }

    get token() {
        return this._token;
    }

    get options() {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        return new RequestOptions({ headers: headers });
    }
}

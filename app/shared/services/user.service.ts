import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppSettings } from '../app.settings';
import { AuthenticationService } from './authentication.service';

import { User } from '../../models/user.model';


@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService
    ) { }

    login(user: User): Observable<boolean> {
        return this.http.post(AppSettings.LOGIN_ENDPOINT, user)
            .map(res => res.json())
            .map(res => {
                if (res && res.token) {
                    this.authenticationService.login(res.token);
                    return true;
                }
                return false;
            })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}

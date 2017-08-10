import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';

declare const gapi: any;
const CLIENT_ID = environment.googleClientID;

@Injectable()
export class AuthService {
    authToken: string;

    constructor() { }

    login(onComplete) {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: CLIENT_ID,
                scope: 'https://www.googleapis.com/auth/fusiontables'
            }).then((auth) => {
                auth.signIn().then((result) => {
                    this.authToken = result.getAuthResponse().access_token;
                    onComplete();
                });

            });
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {} from '@types/googlemaps';

import {AuthService} from '../auth.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
    constructor(private auth: AuthService, private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() { }

    onLoginButtonClicked() {
        this.auth.login(() => {
            this.router.navigate(['map'], {relativeTo: this.route});
        });
    }
}
import { Component, OnInit } from '@angular/core';
import { CookieMonstterService } from '../../services/cookie-monstter.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'app-cookie-manager',
    templateUrl: './cookie-manager.component.html',
    styleUrls: ['./cookie-manager.component.scss']
})
export class CookieManagerComponent implements OnInit {

    formCookie: FormGroup

    constructor(
        private cookieMonster: CookieMonstterService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {

        this.formCookie = this.fb.group({
            kununu: [''],
            youtube: [''],
            hide: ['']
        });

        this.cookieMonster.cookiePermissions();

        this.cookieMonster.userCookiePermitsData.subscribe(cookies => {
            console.log(cookies);

            if (cookies === null || cookies.length <= 0) {
                document.getElementById('cookieMonster').classList.add('active');
            } else {
                _.forEach(cookies, cookie => {
                    this.formCookie.controls[cookie].patchValue(true)
                });
            }
        });

    }

    toggle(e) {
        this.cookieMonster.setCookiePermissions(e);
    }

    hideCookieManager() {
        document.getElementById('cookieMonster').classList.remove('active');
    }

}

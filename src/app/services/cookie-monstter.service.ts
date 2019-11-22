import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class CookieMonstterService {

    private userCookiePermits = new ReplaySubject<Array<string>>();
    userCookiePermitsData = this.userCookiePermits.asObservable();

    constructor(
        private cookieService: CookieService
    ) { }

    changeCookiePermissions(cookieStatusData) {
        this.userCookiePermits.next(cookieStatusData);
    }

    setCookiePermissions(e) {
        let cookie = this.getCookiePermissions();
        let name = e.target.name;

        cookie === null ?
            cookie = [name] :
            cookie.push(name);

        !e.target.checked ?
            cookie = cookie.filter(e => e !== name) : null

        if (cookie === null || cookie.length <= 0) {
            this.cookieService.delete("userCookiePermits");
        } else {
            this.cookieService.set("userCookiePermits", JSON.stringify(cookie));
        }
        this.changeCookiePermissions(cookie);
    }

    cookiePermissions() {
        this.changeCookiePermissions(this.getCookiePermissions());
    }

    getCookiePermissions() {
        if (this.cookieService.check('userCookiePermits')) {
            return JSON.parse(this.cookieService.get('userCookiePermits'));
        }
        return null;
    }

}

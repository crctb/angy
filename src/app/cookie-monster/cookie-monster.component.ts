import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cookie-monster',
    templateUrl: './cookie-monster.component.html',
    styleUrls: ['./cookie-monster.component.scss']
})
export class CookieMonsterComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    toggleCookieManager() {
        document.getElementById('cookieMonster').classList.toggle('active');
    }

}

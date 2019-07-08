import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class BrandingService {

    node;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    checkBranding(): boolean {

        let res: boolean;

        this.http.get('assets/stylsses.css', {
            responseType: 'text',
            observe: 'response'
        })
            .subscribe((data => {
                if (data === null || data.headers.get('content-type').indexOf('text/css') === -1) {
                    console.log('branding not exists');
                    res = true;
                } else {
                    console.log('branding exists');
                    res = false;
                }
            }));

        return res;

    }

    checkBrandingLoaded() {

        let x = document.getElementById('branding').onload = function (ev) {
            console.log(ev);
            return true;
        }
        if (x) {
            console.log('routing');
            this.router.navigate(['/main']);
        }
    }

    createBranding() {

        const head = document.getElementsByTagName('head')[0];
        const node = document.createElement('link');
        node.rel = 'stylesheet';
        node.type = 'text/css';
        node.href = 'assets/styles.css';
        node.id = 'branding';
        head.appendChild(node);

        this.node = node;

        console.log('created');

        console.log(this.checkBrandingLoaded());

    }

}

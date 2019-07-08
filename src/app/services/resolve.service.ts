import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { LoadingService } from './loading.service';
import { Subject, Observable, of, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ResolveService implements Resolve<string> {

    constructor(
        public router: Router,
        private loadingService: LoadingService,
        private http: HttpClient
    ) { }


    createBranding(): boolean {

        const head = document.getElementsByTagName('head')[0];
        const node = document.createElement('link');
        node.rel = 'stylesheet';
        node.type = 'text/css';
        node.href = 'assets/styles.css';
        node.id = 'branding';
        head.appendChild(node);

        let x = document.getElementById('branding').onload = function (ev) {
            console.log(ev);
            return true;
        }
        if (x) {
            console.log('routing');
            this.router.navigate(['/main']);
            return true;
        } else {
            return false;
        }

        // this.node = node;
        // return
    }

    routeUrl() {
        this.router.navigate(['/main']);
    }

    resolve(route: ActivatedRouteSnapshot): Promise<string> | string {

        // return this.createBranding();

        const head = document.getElementsByTagName('head')[0];
        const node = document.createElement('link');
        node.rel = 'stylesheet';
        node.type = 'text/css';
        node.href = 'assets/styles.css';
        node.id = 'branding';
        head.appendChild(node);

        node.onload = function() {
console.log('bammmm');
        }

        return new Promise((resolve, reject) => {
            console.log(node.onload = function() { true })
            if (node.onload = function() {}) {
                
                resolve('JA')
            } else {
                reject('NEIN')
            }
        })

        // return node.onload = function (ev) {
        //     .catch()
        //     if (ev) {
        //         return new Promise.resolve(true)
        //     } else {
        //         return new Promise.reject(false)
        //     }
        // }

        // if (x) {
        //     console.log('routing');
        //     this.router.navigate(['/main']);
        //     return Promise.resolve(true);
        // } else {
        //     return Promise.resolve(false);
        // }

        // return;
        // let x = document.getElementById('branding');

        // this.router.navigate(['/blank']);

        // const head = document.getElementsByTagName('head')[0];
        // const node = document.createElement('link');
        // node.rel = 'stylesheet';
        // node.type = 'text/css';
        // node.href = 'assets/styles.css';
        // node.id = 'branding';
        // head.appendChild(node);

        // let pommes = this.router;

        // function bamm(pommes: Router) {
        //     console.log(456546425);

        //     pommes.navigate(['/main']);
        // }


        // node.onload = function() {
        //     console.log('jappa');
        //     bamm(pommes);
        //     return true;
        // }

        // node.onload = (() => {
        //     console.log('jappa');
        //     this.router.navigate(['/main']);
        //     return true;
        // })

        // return false;

        // let x: Observable<boolean> = Observable.of(false); 
        // this.http.get('assets/styles.css', {
        //     responseType: 'text',
        //     observe: 'response'
        // })
        // .pipe(map((response: any) => response));
        //     .catch((error) => Observable.of(null))
        //     .subscribe((data => {
        //         if (data === null || data.headers.get('content-type').indexOf('text/css') === -1) {
        //             return false
        //         } else {
        //             return true
        //         }
        //     }));
        //     return Observable.of(x)
    }

}



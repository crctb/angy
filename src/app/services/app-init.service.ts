import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor(
        private http: HttpClient
    ) { }

    Init() {

        return new Promise<void>((resolve, reject) => {
            console.log('AppInitService called');

            console.log(window.location);


            this.http.get<any>('/dummy/store/user/getCurrentUser').subscribe(u => {
                console.log(u.company.id);
                // console.log(window.location.pathname.split("/").pop());

                let node = document.createElement('link');
                node.href = 'assets/' + u.company.id + '/styles.css';
                node.rel = 'stylesheet';
                node.type = 'text/css';

                document.getElementsByTagName('head')[0].appendChild(node);

                this.http.get('assets/' + u.company.id + '/styles.css', {
                    responseType: 'text',
                    observe: 'response'
                })
                    .subscribe((data => {
                        if (data !== null || data.headers.get('content-type').indexOf('text/css') === 1) {
                            resolve();
                        }
                    }), error => {
                        console.log('fuck');
                        resolve();
                    })

            });

        });

    }

}
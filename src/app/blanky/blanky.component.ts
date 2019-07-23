import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-blanky',
    templateUrl: './blanky.component.html',
    styleUrls: ['./blanky.component.scss']
})
export class BlankyComponent implements OnInit, AfterViewInit {

    constructor(
        private http: HttpClient,
        private route: Router
    ) { }

    ngAfterViewInit() {

    }

    ngOnInit() {

        let node = document.createElement('link');
        node.rel = 'stylesheet';
        node.href = 'assets/style.css';
        node.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(node);

        // document.getElementById('test').setAttribute('href', 'assets/style.css');

        // this.http.get('assets/' + branding + '.css', {
        //     responseType: 'text',
        //     observe: 'response'
        // })
        //     .subscribe((data => {
        //         if (data === null || data.headers.get('content-type').indexOf('text/css') === -1) {
        //             console.log('jo');

        //         } else {
        //             console.log('nö');
        //         }
        //     }));

    }

}

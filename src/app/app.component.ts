import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    ngOnInit() {

        let node = document.createElement('link');
        node.rel = 'stylesheet';
        node.href = 'assets/style.css';
        node.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(node);


    }


}


import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    private themeWrapper = document.querySelector('body');

    isNavbarCollapsed: boolean = true;
    isSidebarCollapsed: boolean = true;

    css: boolean = false;

    eins = './assets/styles.css';

    constructor() { }

    ngOnInit() {

        this.themeWrapper.style.setProperty('--footerBackground', 'red');

        // require('style-loader!./../../assets/styles.css')

    }

    toggleCss() {
        this.css = !this.css;
        if (this.css) {
            require('style-loader!./../../assets/styles.css')
        } else {
            require('style-loader!./../../assets/styles2.css')
        }
    }

}

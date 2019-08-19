import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { debounceTime } from 'rxjs/operators';


@Component({
    selector: 'app-blanky',
    templateUrl: './blanky.component.html',
    styleUrls: ['./blanky.component.scss']
})
export class BlankyComponent implements OnInit, AfterViewInit {

    data = new Array(4).fill('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.');

    pommes: number;

    isRoot: boolean;

    disableInviewport: boolean = true;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private scrollToService: ScrollToService
    ) { }


    ngOnInit() {

        // on reload scrollto previous position
        this.route.fragment
            .pipe(debounceTime(100))
            .subscribe(x => {
                if (x !== null) {
                    this.scrollToService.scrollTo({
                        target: x,
                        offset: -100
                    })
                }
            })
    }

    ngAfterViewInit() {
        this.pommes = document.getElementById('pommes').offsetTop;
        console.log(this.pommes);
    }

    karl(event) {
        console.log(event.pageYOffset, this.pommes, event.target.clientHeight);

        if (event.pageYOffset < this.pommes) {
            event.target.classList.add('test2');
            event.target.classList.remove('test');
        } else {
            event.target.classList.remove('test2');
            event.target.classList.add('test');
        }
    }

    bamm(event) {
        // console.log(event);

        let navLink = document.getElementById('nav-' + event.target.id);

        if (event.value) {

            this.location.replaceState(window.location.pathname + '#' + event.target.id);
            if (navLink !== null) {
                navLink.classList.add('active');
            }
        } else {
            if (navLink) {
                navLink.classList.remove('active');
            }
        }
    }

}

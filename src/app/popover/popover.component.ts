import { Component, OnInit, ViewChild } from '@angular/core';
import { PopperContent } from 'ngx-popper';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

    @ViewChild('fav', { static: false }) fav: PopperContent;


    roundy = new Array(10).fill(2);

    constructor() { }

    ngOnInit() {
    }

    test() {
        this.fav.hide();
    }

}

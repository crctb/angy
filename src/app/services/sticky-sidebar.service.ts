import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';


class PageYOffset {
    pageYOffset: number;
    direction: string;
    maxHeight: number;
    innerHeight: number;
}

@Injectable({
    providedIn: 'root'
})
export class StickySidebarService {

    private pageYoffset = new ReplaySubject<PageYOffset>(null);
    pageYOffset = this.pageYoffset.asObservable();

    constructor() {
        let lastScrollTop = window.pageYOffset;

        window.addEventListener('scroll', (event) => {
            const st = window.pageXOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                this.updatePageYoffset(window.pageYOffset, 'down', this.updateMaxHeight(), this.updateWindowInnerHeight());
            } else {
                this.updatePageYoffset(window.pageYOffset, 'up', this.updateMaxHeight(), this.updateWindowInnerHeight());
            }
            lastScrollTop = st <= 0 ? 0 : st;
        }, false);
    }

    updatePageYoffset(pageYOffset, direction, maxHeight, innerHeight) {
        this.pageYoffset.next({ pageYOffset, direction, maxHeight, innerHeight });
        this.pageYoffset.complete();
    }

    // get max scroll height
    updateMaxHeight() {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }

    updateWindowInnerHeight() {
        return window.innerHeight;
    }
}

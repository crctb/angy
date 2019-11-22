import { Component, OnInit } from '@angular/core';

export interface InViewportEvent {
    target: HTMLElement;
    value: boolean;
    pageYOffset: number;
    direction: string;
    maxHeight: number;
    innerHeight: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'angy';

    dummyData = new Array(15).fill('Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.')
    dummyNav = new Array(30).fill('Navi ');

    info: InViewportEvent;

    lastScrollTop: number = 0;
    actualOffsetTop: number = 0;

    onlyOnce: boolean = false;

    upActive: boolean = false;
    downActive: boolean = false;

    sidebar;

    pommes;

    ngOnInit() {

        this.lastScrollTop = document.getElementById('bams').offsetTop;
        this.sidebar = document.getElementById('bams');

    }

    bamm(e: InViewportEvent) {
        // console.log(e);

        // this.lastScrollTop = document.getElementById('bams').offsetTop;

        this.info = e;

        let windowHeight = e.innerHeight;
        let sidebarHeight = this.sidebar.clientHeight;

        let scrollTop = e.pageYOffset;
        let scrollBottom = e.pageYOffset + e.innerHeight;

        let sidebarTop = this.sidebar.offsetTop;
        let sidebarBottom = sidebarTop + sidebarHeight;

        let heightDelta = Math.abs(windowHeight - sidebarHeight);
        let scrollDelta = this.lastScrollTop - scrollTop;

        let isScrollingDown = (scrollTop > this.lastScrollTop);
        let isWindowLarger = (windowHeight > sidebarHeight);

        console.log(scrollTop, this.lastScrollTop);


        let dragBottomDown = (sidebarBottom <= scrollBottom && e.direction === 'down');
        let dragTopUp = (sidebarTop >= scrollTop && e.direction === 'up');

        this.pommes = {
            windowHeight: windowHeight,
            sidebarHeight: sidebarHeight,
            scrollTop: scrollTop,
            scrollBottom: scrollBottom,
            sidebarTop: sidebarTop,
            sidebarBottom: sidebarBottom,
            heightDelta: heightDelta,
            scrollDelta: scrollDelta,
            isScrollingDown: isScrollingDown,
            isWindowLarger: isWindowLarger,
            dragBottomDown: dragBottomDown,
            dragTopUp: dragTopUp
        }

        if (dragBottomDown) {
            if (isWindowLarger) {
                e.target.style.top = scrollTop + 'px';
                e.target.style.background = 'green';
            } else {
                e.target.style.top = (scrollTop - heightDelta) + 'px';
                e.target.style.background = 'blue';
                console.log(scrollTop - heightDelta)
            }
        } else if (dragTopUp) {
            e.target.style.background = 'purple';
            e.target.style.top = scrollTop + 'px';
        } else if (e.target.style.position === 'fixed') {
            let currentTop = sidebarTop;

            let minTop = -heightDelta;
            let scrolledTop = currentTop + scrollDelta;

            let isPageAtBottom = (scrollTop + windowHeight >= e.maxHeight);
            let newTop = (isPageAtBottom) ? minTop : scrolledTop;

            console.log(e.pageYOffset - heightDelta, isPageAtBottom, newTop, scrolledTop);

            // e.target.style.top = newTop + 'px';
        }

        // wasScrollingDown = isScrollingDown;

        e.target.style.width = '290px';

        if ((isWindowLarger && scrollTop > this.lastScrollTop) || (!isWindowLarger && scrollTop > this.lastScrollTop + heightDelta)) {
            e.target.style.position = 'relative';
        } else if (!isScrollingDown && scrollTop <= this.lastScrollTop) {
            e.target.style.position = 'relative';
        }

        if (e.direction === 'up') {
            this.downActive = true;

            if (this.upActive) {
                this.actualOffsetTop = e.pageYOffset - (e.target.clientHeight - e.innerHeight);

                this.actualOffsetTop < this.lastScrollTop ?
                    this.actualOffsetTop = this.lastScrollTop :
                    this.actualOffsetTop;

                this.upActive = false;
            }

        }

        if (e.direction === 'down') {
            this.upActive = true;
            this.lastScrollTop = scrollTop;

            if (this.downActive) {
                this.actualOffsetTop = e.pageYOffset - (e.target.clientHeight - e.innerHeight);

                this.actualOffsetTop < this.lastScrollTop ?
                    this.actualOffsetTop = this.lastScrollTop :
                    this.actualOffsetTop;

                this.downActive = false;
            }

        }

    }
}





        // if (e.direction === 'down') {

        //     e.target.style.width = '290px';
        //     console.log(e.pageYOffset, this.actualOffsetTop, this.actualOffsetTop + (e.target.clientHeight - e.innerHeight) + e.target.offsetTop);


        //     if (e.pageYOffset <= this.actualOffsetTop + (e.target.clientHeight - e.innerHeight) + e.target.offsetTop) {
        //         e.target.style.transform = 'translateY(' + this.actualOffsetTop + 'px)';
        //         e.target.style.position = 'relative';
        //         e.target.style.bottom = 'auto';
        //         e.target.style.top = 'auto';
        //         e.target.style.background = 'blue';
        //     } else {
        //         e.target.style.transform = 'translateY(0px)';
        //         e.target.style.position = 'fixed';
        //         e.target.style.bottom = '0px';
        //         e.target.style.top = 'auto';
        //         e.target.style.background = 'green';
        //     }
        // }

        // if (e.direction === 'up' && e.pageYOffset >= e.target.clientHeight - e.innerHeight) {
        //     e.target.style.background = 'grey';
        //     e.target.style.position = 'relative';
        //     e.target.style.bottom = 'auto';
        //     e.target.style.top = 'auto';
        //     e.target.style.width = '290px';
        //     e.target.style.transform = 'translateY(' + (this.actualOffsetTop - this.lastScrollTop) + 'px)';
        // }

        // if (e.direction === 'up' && e.pageYOffset <= this.actualOffsetTop + this.lastScrollTop) {
        //     e.target.style.transform = 'translateY(0px)';
        //     e.target.style.background = 'red';
        //     e.target.style.position = 'fixed';
        //     e.target.style.bottom = 'auto';
        //     e.target.style.top = '0px';
        // }

        // if (e.direction === 'up' && e.pageYOffset <= this.lastScrollTop) {
        //     e.target.style.transform = 'translateY(0px)';
        //     e.target.style.background = 'purple';
        //     e.target.style.position = 'relative';
        //     e.target.style.bottom = 'auto';
        //     e.target.style.top = 'auto';
        // }
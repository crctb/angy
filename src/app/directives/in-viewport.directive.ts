import { Directive, OnInit, OnDestroy, Input, Output, EventEmitter, Inject, PLATFORM_ID, ElementRef, Renderer2, Type } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { merge, debounceTime } from 'rxjs/operators';

/**
 * library to check inViewport
 * - add / remove class 'active'
 * 
 * @Input
 * - offsetTop = 0;
 * - offsetBottom = 0;
 * - triggerTop: boolean = false; // always active until leave on scroll up
 * - triggerBottom: boolean = false; // always active until leave on scroll down
 * - debounceTime: number = 100; // trigger debounce in ms
 *
 * @example
 * ```html
 * <p
 *  class="foo"
 *  appInViewport
 *  (inViewportChange)="myEventHandler($event)"
 *  [offsetTop]="number"
 *  [offsetBottom]="number"
 *  [triggerTop]="boolean"
 *  [triggerBottom]="boolean"
 *  [debounceTime]="number">
 *  Amet tempor excepteur occaecat nulla.
 * </p>
 * ```
 */

export interface InViewportEvent {
    target: HTMLElement;
    value: boolean;
    pageYOffset: number;
}

@Directive({
    selector: '[appInViewport]'
})

export class InViewportDirective implements OnInit, OnDestroy {

    @Input() offsetTop = 0;
    @Input() offsetBottom = 0;
    @Input() triggerTop: boolean = false;
    @Input() triggerBottom: boolean = false;
    @Input() debounceTime: number = 100;
    @Input() disabled: boolean = false;

    @Output() readonly inViewport = new EventEmitter<InViewportEvent>();

    private subscription: Subscription;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private readonly elemtRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        if (!this.disabled) {
            console.log(this.platformId);
            if (isPlatformBrowser(this.platformId)) {
                this.subscription = fromEvent(window, 'scroll')
                    .pipe(
                        merge(fromEvent(window, 'resize')),
                        debounceTime(this.debounceTime)
                    )
                    .subscribe(() => this.check());
            }
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private check() {

        let trigger: boolean;

        let el = this.elemtRef.nativeElement.getBoundingClientRect();
        let win = window.pageYOffset;

        if (this.triggerTop) {
            trigger = document.body.contains(this.elemtRef.nativeElement) &&
                el.top + window.innerHeight <= window.innerHeight + this.offsetTop
        } else if (this.triggerBottom) {
            trigger = document.body.contains(this.elemtRef.nativeElement) &&
                el.bottom + window.innerHeight >= window.innerHeight - this.offsetBottom
        } else {
            trigger = el.top + el.height + this.offsetBottom - (window.innerHeight / 4) >= 0 &&
                el.top + this.offsetTop <= window.innerHeight / 4;
        }

        const event: InViewportEvent = {
            target: this.elemtRef.nativeElement,
            value: trigger,
            pageYOffset: win
        };

        event.value ?
            this.renderer.addClass(event.target, 'active') :
            this.renderer.removeClass(event.target, 'active');

        this.inViewport.emit(event);
    }

}

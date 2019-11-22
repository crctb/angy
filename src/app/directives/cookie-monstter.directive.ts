import {
    Directive,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    Input
} from '@angular/core';

import { CookieService } from "ngx-cookie-service";
import { CookieMonstterService } from "../services/cookie-monstter.service";

@Directive({
    selector: '[appCookieMonstter]'
})
export class CookieMonstterDirective {

    @Input() type: string;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private cookieService: CookieService,
        private cookieMonster: CookieMonstterService
    ) { }

    ngOnInit() {
        this.cookieMonster.userCookiePermitsData.subscribe(c => {
            this.deactivateElement();
            if (c) {
                if (c.find(e => e === this.type)) {
                    this.activeElement();
                } else {
                    this.deactivateElement();
                }
            } else {
                this.deactivateElement();
            }
        });
    }

    activeElement() {
        this.viewContainer.createEmbeddedView(this.templateRef);
    }

    deactivateElement() {
        this.viewContainer.clear();
    }

}

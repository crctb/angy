import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandingService } from './services/branding.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private brandingService: BrandingService
    ) {}

    ngOnInit() {

        // console.log(this.brandingService.createBranding());

    }
}

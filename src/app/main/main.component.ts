import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    isNavbarCollapsed: boolean = true;
    isSidebarCollapsed: boolean = true;

    constructor(
        private loadingService: LoadingService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {

    }

}

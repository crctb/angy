import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { BlankyComponent } from './blanky/blanky.component';

import { AppInitService } from './services/app-init.service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { InViewportDirective } from './directives/in-viewport.directive';

export function initializeApp(appInitService: AppInitService) {
    return (): Promise<any> => {
        return appInitService.Init();
    }
}

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        HeaderComponent,
        FooterComponent,
        BlankyComponent,
        InViewportDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        ScrollToModule.forRoot()
    ],
    providers: [
        AppInitService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppInitService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

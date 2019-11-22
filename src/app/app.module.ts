import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { PciComponent } from './main/pci/pci.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DefaultImageDirective } from './directives/default-image.directive';
import { ContentLoaderModule  } from './content-loader/content-loader.module';
import { InViewportDirective } from './directives/in-viewport.directive';
import { CookieMonsterComponent } from './cookie-monster/cookie-monster.component';
import { CookieManagerComponent } from './cookie-monster/cookie-manager/cookie-manager.component';
import { PageOneComponent } from './cookie-monster/page-one/page-one.component';
import { PageTwoComponent } from './cookie-monster/page-two/page-two.component';
import { CookieMonstterDirective } from './directives/cookie-monstter.directive';
import { CookieMonstterService } from './services/cookie-monstter.service';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        HeaderComponent,
        FooterComponent,
        PciComponent,
        DefaultImageDirective,
        InViewportDirective,
        CookieMonsterComponent,
        CookieManagerComponent,
        PageOneComponent,
        PageTwoComponent,
        CookieMonstterDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ContentLoaderModule
    ],
    providers: [ CookieService, CookieMonstterService ],
    bootstrap: [AppComponent]
})
export class AppModule { }

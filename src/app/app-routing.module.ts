import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PciComponent } from './main/pci/pci.component';

import { CookieMonsterComponent } from './cookie-monster/cookie-monster.component';
import { PageOneComponent } from './cookie-monster/page-one/page-one.component';
import { PageTwoComponent } from './cookie-monster/page-two/page-two.component';

const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    {
        path: 'cookie', component: CookieMonsterComponent, children: [
            { path: 'page-one', component: PageOneComponent },
            { path: 'page-two', component: PageTwoComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

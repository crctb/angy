import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ResolveService } from './services/resolve.service';
import { BlankyComponent } from './blanky/blanky.component';

const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'blanky', component: BlankyComponent },
    { path: 'blanky/:id:anchor', component: BlankyComponent },
    { path: 'main', component: MainComponent, resolve: { res: ResolveService } },
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: "reload" }
    )],
    exports: [RouterModule],
    providers: [ResolveService]
})
export class AppRoutingModule { }

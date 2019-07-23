import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PopoverComponent} from './popover/popover.component';
import { BlankyComponent } from './blanky/blanky.component';

const routes: Routes = [
  { path: '', redirectTo: 'blanky', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'popover', component: PopoverComponent },
  { path: 'blanky', component: BlankyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { ShortComponent } from './short/short.component';
import { AppComponent } from './app.component';
import { LoggedInGuard } from './logged-in.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedInGuard],
    component: ShortComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

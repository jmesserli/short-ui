import { ShortComponent } from './short/short.component';
import { LoggedInGuard } from './logged-in.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLinksComponent } from './user-links/user-links.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedInGuard],
    component: ShortComponent,
  },

  {
    path: 'links',
    canActivate: [LoggedInGuard],
    component: UserLinksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

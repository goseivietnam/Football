import { RouterModule, Routes } from '@angular/router';

import { LoginPageAdminComponent } from './pages/login-page-admin/login-page-admin.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { authGuard } from './guard/canActivate/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./featureModule/layout-client/layout-client.module').then(
        (m) => m.LayoutClientModule
      ),
  },
  {
    path: 'admin',
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./featureModule/layout-admin/layout-admin.module').then(
        (m) => m.LayoutAdminModule
      ),
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'login-admin', component: LoginPageAdminComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

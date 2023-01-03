import { HomeComponent } from './examples/home.component';
import { MainGridPageComponent } from './main-grid-page/main-grid-page.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/lib/auth/auth.service';
import { AuthGuard } from 'src/lib/auth/auth-guard.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'main-grid-page', children: [
      {
        path: '',
        component: MainGridPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: UserDetailsComponent
      },
    ]
  },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/main-grid-page', pathMatch: 'full', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }), TranslateModule],
  exports: [RouterModule, TranslateModule],
  providers: [AuthService]
})
export class AppRoutingRoutingModule { }

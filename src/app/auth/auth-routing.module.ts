import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetAccountPassComponent } from './pages/reset-account-pass/reset-account-pass.component';



const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'verify-account/:id', component: VerifyAccountComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password/:id', component: ResetAccountPassComponent},

      {path: '**', redirectTo: 'login'}

    ]

   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetAccountPassComponent } from './pages/reset-account-pass/reset-account-pass.component';






@NgModule({
    declarations: [
        AuthLayoutComponent,
        LoginPageComponent,
        RegisterPageComponent,
        VerifyAccountComponent,
        ForgotPasswordComponent,
        ResetAccountPassComponent,


    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,

    ]
})
export class AuthModule { }

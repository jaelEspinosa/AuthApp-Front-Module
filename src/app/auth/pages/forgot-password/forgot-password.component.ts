import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swall from 'sweetalert2'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'forgot-password-app',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  private fb = inject( FormBuilder)
  private router = inject( Router )
  private authService = inject( AuthService )


  public myForm: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],


  })

  onSubmit() {

    this.authService.forgotPassword(this.myForm.get('email')!.value)
       .subscribe({
        next: resp => {

          swall.fire({icon:'success', text:'Revise su bandeja de entrada'})
          this.router.navigate(['/auth/login']);
        },
        error: err => {
          console.log(err)
          swall.fire({icon: 'error', text:err.error.message})
        }
       })

  }
}

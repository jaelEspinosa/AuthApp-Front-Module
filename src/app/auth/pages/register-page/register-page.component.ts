import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  private fb    = inject( FormBuilder );
  private authService = inject ( AuthService );
  private router = inject ( Router )

  public passwordMatch: Boolean= true

  public myForm: FormGroup = this.fb.group({
    name:     ['', [Validators.required, Validators.minLength(6)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],

  })

  onRegister (){
    if (this.myForm.get('password')?.value !== this.myForm.get('password2')?.value) {
      this.passwordMatch = false
      Swal.fire({title: 'Error', text:'Las Contraseñas no coinciden', icon: 'error'})
      return
    }
    const{name, email, password} = this.myForm.value
    this.authService.register(name, email, password)
      .subscribe({
        next: (response => {
          Swal.fire({icon: 'success', text:`Usuario: ${response.user.name}, ha sido creado con éxito, revise su correo para activar la cuenta.`})
          setTimeout(() => {
            this.router.navigateByUrl('/auth/login')
          }, 2000);
        }),
        error: (error) =>{
          Swal.fire({title:'Error',text: error.error.message, icon:'error'})
        }
      })
  }
}

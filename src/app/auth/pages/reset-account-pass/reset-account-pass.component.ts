import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import swall from 'sweetalert2';

@Component({
  selector: 'reset-account-pass-app',
  templateUrl: './reset-account-pass.component.html',
  styleUrls: ['./reset-account-pass.component.css']
})


export class ResetAccountPassComponent {

  private fb          = inject( FormBuilder );
  private authService = inject ( AuthService );
  private router      = inject ( Router );
  private route       = inject ( ActivatedRoute )

  private userToken: string | null = '';

  ngOnInit() {
    this.userToken = this.route.snapshot.paramMap.get('id')

  }

  public myForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],

  })
  onSubmit(){

  if(this.myForm.get('password')?.value !== this.myForm.get('password2')?.value){
      Swal.fire({icon:'error', text:'Las contraseñas no coinciden'})
    }
  if(!this.userToken) return

  this.authService.resetPassword(this.myForm.get('password')!.value, this.userToken)
  .subscribe({
    next: resp =>{
      swall.fire({icon:'success', text: resp.msg+'. Puedes logearte con tu nuevo password'})
    },
    error: err =>{
      swall.fire({icon:'error', text: err.error.message})

    },

  })
  setTimeout(() => {
    this.router.navigateByUrl('/auth/login')
  }, 1500);
  }

};

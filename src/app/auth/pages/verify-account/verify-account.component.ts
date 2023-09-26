import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  private authService = inject ( AuthService)
  private router = inject ( Router)
  private route = inject( ActivatedRoute )

  ngOnInit() {
    this.userToken = this.route.snapshot.paramMap.get('id')

  }

  private userToken:string | null = ''

  verificar(){
    console.log ('verificando la cuenta....', this.userToken)
    if (!this.userToken) {
      Swal.fire({icon: 'error', title:'Error', text:'Hubo un error al activar el Usuario.'})
      return
    };
    this.authService.verifyAccount(this.userToken)
      .subscribe({
        next: ({name, msg}) => {
          Swal.fire({icon:'success', text: `${name}, ${msg}, Puedes Logearte`});
          this.router.navigateByUrl('/auth/login')

        },
        error: (err)=>{
          console.log(err.error.message)
          Swal.fire({icon:'error', text: err.error.message})
        }
      })

  }

}

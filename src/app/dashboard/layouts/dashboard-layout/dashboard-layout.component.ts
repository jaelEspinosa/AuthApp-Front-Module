import { Component, computed, inject } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authService = inject( AuthService )

  constructor(){

  }


  // se puede obtener el valor de currentUser de dos formas

  // una es asi:

  /* get user() {
      return this.authService.currentUser()
  } */

// y la otra es :

public user = computed( ()=> this.authService.currentUser())

onLogout(){
  this.authService.logout()


}
}

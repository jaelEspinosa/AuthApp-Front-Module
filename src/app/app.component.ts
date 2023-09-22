import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private authService = inject ( AuthService )
  private router = inject ( Router )


  public finishedAuthCheck = computed<boolean>( ()=> {
    if (this.authService.authStatus() === AuthStatus.checking){
      return false;
    }
   return true;
  })

public authStatusChangedEffect = effect( ()=>{

 console.log('authService: ', this.authService.authStatus())
  switch( this.authService.authStatus() ){
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        let url = localStorage.getItem( 'url' );
        if (!url) {
          url = '/dashboard'
        }
        this.router.navigateByUrl( url );
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl( '/auth/login');
        return;
  }

})
}

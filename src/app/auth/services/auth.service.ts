import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,  computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthStatus, CheckTokenResponse, ForgotPassword, LoginResponse, ResetPassResponse, User, VerifyResponse } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient)
  private router = inject(Router)

  private _currentUser = signal<User|null>(null);
  private _authStatus  = signal<AuthStatus>( AuthStatus.checking );

  //! valores que seran visibles fuera del servicio

  public currentUser = computed( ()=> this._currentUser() );
  public authStatus  = computed( ()=> this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
   }

  private setAuthentication(user: User, token: string):boolean{

    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);
    return true;
  }


register ( name: string, email: string, password: string ): Observable<LoginResponse>{
  const url = `${this.baseUrl}/auth/register`
  const body = {name, email, password}

  return this.http.post<LoginResponse>(url, body)
}

login( email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }
    this._authStatus.set(AuthStatus.checking)
    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map(({user, token}) => this.setAuthentication( user, token )),
      catchError( (err) =>{
       this._authStatus.set( AuthStatus.notAuthenticated)
       return throwError( ()=> err.error.message)
      })
      )
     }

logout () {

  localStorage.removeItem('token');
  this._authStatus.set(AuthStatus.notAuthenticated)
  this._currentUser.set( null )
  this.router.navigateByUrl('/auth/login')

}

verifyAccount ( token: string ):Observable<VerifyResponse>{
  const url = `${this.baseUrl}/auth/verify`
  const body = {
    tokenOneUse: token
  }
  return this.http.put<VerifyResponse>( url, body )
}

forgotPassword ( email: string ):Observable<ForgotPassword>{
  const url = `${this.baseUrl}/auth/forgot-password`
  const body = {
    email
  }
  console.log('el body es ',body)

  return this.http.put<ForgotPassword>( url, body )


}

resetPassword ( newPassword: string, tokenOneUse: string):Observable<ResetPassResponse> {

  const url = `${this.baseUrl}/auth/reset-password`

  const body = {
    tokenOneUse,
    newPassword
  }

  return this.http.put<ResetPassResponse>(url, body)

}



checkAuthStatus():Observable<boolean>{
      const url = `${this.baseUrl}/auth/check-token`
      const token = localStorage.getItem('token')

      if (!token) {
        this._authStatus.set( AuthStatus.notAuthenticated)

        return of(false)
      };

      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${ token }`)

        return this.http.get<CheckTokenResponse>(url, { headers })
        .pipe(
          map(({ token, user }) => this.setAuthentication(user, token)),
          catchError( () => {
            this._authStatus.set( AuthStatus.notAuthenticated)
            return of(false)
          })

        )
 }

}

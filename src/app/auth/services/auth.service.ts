import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient)

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


login( email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map(({user, token}) => this.setAuthentication( user, token )),
      catchError( err =>  throwError( ()=> err.error.message)
       )
     )
    }
logout () {

  localStorage.removeItem('token');
  this._authStatus.set(AuthStatus.notAuthenticated)
  this._currentUser.set( null )

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

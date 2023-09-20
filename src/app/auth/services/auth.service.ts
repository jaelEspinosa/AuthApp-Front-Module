import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient)

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  //! valores que seran visibles fuera del servicio

  public currentUser = computed( ()=> this._currentUser() );
  public authStatus  = computed( ()=> this._authStatus() );

  constructor() { }


  login( email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      tap( ({user, token}) => {
        this._currentUser.set( user )
        this._authStatus.set( AuthStatus.authenticated)
        localStorage.setItem('token', token)
        console.log({user, token})
      }),
      map( () => true)

      //Todo: errores
    )


  }
}
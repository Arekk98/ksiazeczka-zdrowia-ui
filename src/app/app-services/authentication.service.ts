import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User|null>
  public user: Observable<User | null>

  constructor(private router: Router,
              private http: HttpClient) {
    const userJson = localStorage.getItem('user')
    this.userSubject = new BehaviorSubject<User|null>(userJson != null ? JSON.parse(userJson) : null)
    this.user = this.userSubject.asObservable()
  }

  public get userValue(): User | null {
    return this.userSubject.value
  }

  login(user: User): Observable<User> {
    user.authdata = window.btoa(user.username + ':' + user.password)
    localStorage.setItem('user', JSON.stringify(user))
    return this.http.post(`${environment.apiUrl}/login`, {}, {responseType: 'text'})
      .pipe(map(role => {
        user.role = role
        localStorage.setItem('user', JSON.stringify(user))
        this.userSubject.next(user)
        return user
      }))
  }

  logout() {
    localStorage.removeItem('user')
    this.userSubject.next(null)
    this.router.navigate(['/login'])
  }
}

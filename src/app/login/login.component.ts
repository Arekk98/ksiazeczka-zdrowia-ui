import {Component} from '@angular/core';
import {HttpService} from "../app-services/http.service";
import {User} from "../model/user";
import {AuthenticationService} from "../app-services/authentication.service";
import {first, from} from "rxjs";
import {Router} from "@angular/router";
import {Registration} from "../model/registration";
import {Location} from "@angular/common";
import * as Tone from 'tone';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData: Partial<User> = {}
  registrationData: Partial<Registration> = {}
  loginFailed: boolean = false
  registrationSuccess: boolean = false
  registrationFailed: boolean = false
  registrationMessage: string = ''

  constructor(private http: HttpService,
              private authenticationService: AuthenticationService,
              private location: Location,
              private router: Router,
              private auth: AngularFireAuth) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/'])
    }
  }

  login() {
    this.authenticationService.login(this.loginData as User)
      .pipe(first())
      .subscribe({
        next: value => {
          this.location.back()
          navigator.vibrate(1000)
        },
        error: err => {
          this.loginData = {}
          this.loginFailed = true
          new Tone.Synth().toDestination().triggerAttackRelease("G3", "8n")
        }
      })
  }

  login_to_google() {
    from(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
      .pipe(first())
      .subscribe(credential => {
        if (credential.additionalUserInfo?.isNewUser) {
          const profile = credential.additionalUserInfo.profile ?? {}
          this.http.register({
            // @ts-ignore
            username: profile['email'] ?? '',
            // @ts-ignore
            name: profile['given_name'] ?? '',
            // @ts-ignore
            surname: profile['family_name'] ?? '',
            // @ts-ignore
            password: profile['id'] ?? '',
            // @ts-ignore
            repeatedPassword: profile['id'] ?? ''
          })
            .pipe(first())
            .subscribe(value => {
              this.google_login(credential)
            })
        } else {
          this.google_login(credential)
        }
      })
  }

  google_login(userCredential: UserCredential) {
    const profile = userCredential.additionalUserInfo?.profile ?? {}
    this.authenticationService.login({
      // @ts-ignore
      username: profile['email'] ?? '',
      // @ts-ignore
      password: profile['id'] ?? ''
    })
      .pipe(first())
      .subscribe(value => {
        this.location.back()
        navigator.vibrate(1000)
      })
  }

  register() {
    this.http.register(this.registrationData as Registration)
      .pipe(first())
      .subscribe({
        next: value => {
          this.registrationData = {}
          this.registrationSuccess = true
          this.registrationFailed = false
          this.registrationMessage = ''
        },
        error: err => {
          switch (err.error) {
            case 'NOT_SAME':
              this.registrationSuccess = false
              this.registrationFailed = true
              this.registrationMessage = 'Hasła nie są takie same'
              new Tone.Synth().toDestination().triggerAttackRelease("G3", "8n")
              break
            case 'USER_EXISTS':
              this.registrationSuccess = false
              this.registrationFailed = true
              this.registrationMessage = 'Użytkownik o takiej nazwie istnieje'
              new Tone.Synth().toDestination().triggerAttackRelease("G3", "8n")
              break
            case 'VET_CODE':
              this.registrationSuccess = false
              this.registrationFailed = true
              this.registrationMessage = 'Nieprawidłowy kod weterynarza'
              new Tone.Synth().toDestination().triggerAttackRelease("G3", "8n")
              break
            default:
              this.registrationSuccess = false
              this.registrationFailed = true
              this.registrationMessage = 'Nieznany błąd. Spróbuj ponownie później'
              new Tone.Synth().toDestination().triggerAttackRelease("G3", "8n")
              break
          }
        }
      })
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "./app-services/authentication.service";
import {User} from "./model/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  loggedInUser: User|null = null
  subscription: Subscription = new Subscription()

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.subscription.add(this.authenticationService.user.subscribe(user => this.loggedInUser = user))
  }

  logout() {
    this.authenticationService.logout()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

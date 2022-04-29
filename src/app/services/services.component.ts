import { Component, OnInit } from '@angular/core';
import {Service} from "../model/service";
import {HttpService} from "../app-services/http.service";
import {AuthenticationService} from "../app-services/authentication.service";
import {first} from "rxjs";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services: Service[] = []
  loggedInAsVet: boolean = false

  constructor(private http: HttpService,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.loggedInAsVet = (this.authenticationService.userValue?.role === 'ROLE_VET')
    this.http.getServices()
      .pipe(first())
      .subscribe(services => {
        this.services = services
      })
  }

  removeService(serviceId: string | undefined, index: number) {
    this.http.removeService(serviceId ?? '')
      .pipe(first())
      .subscribe(value => {
        this.services.splice(index, 1)
      })
  }
}

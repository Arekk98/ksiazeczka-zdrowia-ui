import { Component } from '@angular/core';
import {Service} from "../../model/service";
import {HttpService} from "../../app-services/http.service";
import {Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent {

  service: Service = {
    name: '',
    description: ''
  }

  constructor(private http: HttpService,
              private router: Router) {}

  add() {
    this.http.addService(this.service)
      .pipe(first())
      .subscribe(value => {
        this.router.navigate(['/services'])
      })
  }
}

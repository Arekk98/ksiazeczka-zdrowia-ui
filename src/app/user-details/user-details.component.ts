import {Component, Input, OnInit} from '@angular/core';
import {UserDetails} from "../model/user-details";
import {HttpService} from "../app-services/http.service";
import {first} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() userDetails: Partial<UserDetails> = {}
  @Input() formTitle: string = 'Dane osobowe'
  @Input() allowModification: boolean = true

  updateSuccess: boolean = false


  constructor(private http: HttpService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(first())
      .subscribe(params => {
        if (params.get('init')) {
          this.http.getUserDetails()
            .pipe(first())
            .subscribe(userDetails => {
              this.userDetails = userDetails
            })
        }
      });
  }

  save() {
    this.http.saveUserDetails(this.userDetails as UserDetails)
      .pipe(first())
      .subscribe(value => {
        this.updateSuccess = true
        setTimeout(() => {
          this.updateSuccess = false
        }, 5000)
      })
  }

  useGeolocation(userDetailsForm: NgForm) {
    navigator.geolocation.getCurrentPosition(position => {
      this.http.getLocationForCoordinates(position.coords.latitude, position.coords.longitude)
        .pipe(first())
        .subscribe(value => {
          this.userDetails.city = value.results[0].address_components.filter(comp => comp.types.indexOf('locality') > -1)[0].long_name
          this.userDetails.postcode = value.results[0].address_components.filter(comp => comp.types.indexOf('postal_code') > -1)[0].long_name

          userDetailsForm.form.markAsDirty()
        })
    })
  }
}

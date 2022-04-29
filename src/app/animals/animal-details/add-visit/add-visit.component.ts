import {Component, Input, OnInit} from '@angular/core';
import {UserShortData} from "../../../model/user-short-data";
import {Service} from "../../../model/service";
import {HttpService} from "../../../app-services/http.service";
import {first} from "rxjs";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css']
})
export class AddVisitComponent implements OnInit {

  animalId: string = ''

  vets: UserShortData[] = []
  services: Service[] = []

  visitDate: string = ''
  vetUsername: string = ''
  servicesIds: string[] = []

  constructor(private http: HttpService,
              private location: Location,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(first())
      .subscribe(params => {
        this.animalId = params['id']
      })

    this.http.getAllVets()
      .pipe(first())
      .subscribe(vets => {
        this.vets = vets
      })

    this.http.getServices()
      .pipe(first())
      .subscribe(services => {
        this.services = services
      })
  }

  addVisit() {
    this.http.addVisit({
      date: this.visitDate,
      servicesIds: this.servicesIds,
      vet: {
        username: this.vetUsername
      }
    }, this.animalId)
      .pipe(first())
      .subscribe(value => {
        this.location.back()
      })
  }
}

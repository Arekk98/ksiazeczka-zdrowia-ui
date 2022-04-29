import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {HttpService} from "../../app-services/http.service";
import {Animal} from "../../model/animal";
import {AnimalDetails} from "../../model/animal-details";
import {AuthenticationService} from "../../app-services/authentication.service";

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {

  animal: Partial<Animal> = {}
  loggedInAsVet: boolean = false
  updateSuccess: boolean = false

  constructor(private route: ActivatedRoute,
              private http: HttpService,
              private router: Router,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.loggedInAsVet = (this.authenticationService.userValue?.role === 'ROLE_VET')
    this.route.params
      .pipe(first())
      .subscribe(params => {
        this.http.getAnimal(params['id'])
          .pipe(first())
          .subscribe(animal => {
            animal.visits = animal.visits?.sort((one, two) => ((one.date ?? '') < (two.date ?? '') ? -1 : 1))
            animal.comments = animal.comments?.sort((one, two) => ((one.date ?? '') < (two.date ?? '') ? -1 : 1))
            this.animal = animal
          })
      })
  }

  saveAnimal(animal: AnimalDetails) {
    this.http.saveAnimal(animal)
      .pipe(first())
      .subscribe(value => {
        this.updateSuccess = true
        setTimeout(() => {
          this.updateSuccess = false
        }, 5000)
        this.ngOnInit()
      })
  }

  removeVisit(visitId: string, index: number) {
    this.http.removeVisit(visitId, this.animal.animal?.id ?? '')
      .pipe(first())
      .subscribe(value => {
        this.animal.visits?.splice(index, 1)
      })
  }

  removeComment(commentId: string, index: number) {
    this.http.removeComment(commentId, this.animal.animal?.id ?? '')
      .pipe(first())
      .subscribe(value => {
        this.animal.comments?.splice(index, 1)
      })
  }
}

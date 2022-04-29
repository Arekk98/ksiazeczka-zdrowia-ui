import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {HttpService} from "../../app-services/http.service";
import {Animal} from "../../model/animal";
import {AnimalDetails} from "../../model/animal-details";
import {AuthenticationService} from "../../app-services/authentication.service";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {

  animal: Partial<Animal> = {}
  loggedInAsVet: boolean = false
  updateSuccess: boolean = false

  ref: AngularFireStorageReference | null = null
  task: AngularFireUploadTask | null = null

  imageURL: string = ''

  constructor(private route: ActivatedRoute,
              private http: HttpService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private fireStorage: AngularFireStorage) {}

  ngOnInit(): void {
    this.loggedInAsVet = (this.authenticationService.userValue?.role === 'ROLE_VET')
    this.route.params
      .pipe(first())
      .subscribe(params => {
        this.http.getAnimal(params['id'])
          .pipe(first())
          .subscribe(animal => {
            if (animal.animal.imageId) {
              this.imageURL = this.createImageUrl(animal.animal.imageId)
            }
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

  upload(event: Event) {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.fireStorage.ref(id)
    // @ts-ignore
    this.task = this.ref.put(event.target.files[0]).then(value => {
      // @ts-ignore
      this.animal.animal?.imageId = value['_delegate']['metadata']['fullPath']
      if (this.animal.animal?.imageId) {
        this.http.saveAnimal(this.animal.animal)
          .pipe(first())
          .subscribe(value => {
            this.imageURL = this.createImageUrl(this.animal.animal?.imageId ?? '')
          })
      }
    })
  }

  createImageUrl(imageId: string): string {
    return `https://firebasestorage.googleapis.com/v0/b/${environment.firebase.storageBucket}/o/` + imageId + `?alt=media&token=${environment.firebase.apiKey}`
  }
}

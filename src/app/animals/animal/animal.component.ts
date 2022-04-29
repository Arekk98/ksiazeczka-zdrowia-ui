import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnimalDetails} from "../../model/animal-details";
import {UserShortData} from "../../model/user-short-data";
import {first} from "rxjs";
import {AuthenticationService} from "../../app-services/authentication.service";
import {HttpService} from "../../app-services/http.service";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit{

  @Input() buttonText: string = ''
  @Input() animal: AnimalDetails = {}
  @Input() updateSuccess: boolean = false

  @Output() animalEvent = new EventEmitter<AnimalDetails>();

  loggedInAsVet: boolean = false
  users: UserShortData[] = []
  dateOfBirthType: string = 'text'

  constructor(private http: HttpService,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.loggedInAsVet = (this.authenticationService.userValue?.role === 'ROLE_VET')

    if (this.loggedInAsVet) {
      this.http.getAllUsers()
        .pipe(first())
        .subscribe(users => {
          this.users = users
        })
    }
  }

  animalSubmit() {
    this.animalEvent.emit(this.animal)
  }
}

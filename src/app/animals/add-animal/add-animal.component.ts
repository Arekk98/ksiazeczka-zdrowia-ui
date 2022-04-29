import {Component} from '@angular/core';
import {AnimalDetails} from "../../model/animal-details";
import {HttpService} from "../../app-services/http.service";
import {first} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent {

  constructor(private http: HttpService,
              private router: Router) {}

  newAnimal(animal: AnimalDetails) {
    this.http.saveAnimal(animal)
      .pipe(first())
      .subscribe(value => {
        this.router.navigate(['/animals'])
      })
  }
}

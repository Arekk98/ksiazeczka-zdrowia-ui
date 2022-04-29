import { Component, OnInit } from '@angular/core';
import {AnimalGeneral} from "../model/animal-general";
import {HttpService} from "../app-services/http.service";
import {first} from "rxjs";

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals: AnimalGeneral[] = []

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http.getAnimals()
      .pipe(first())
      .subscribe(animals => {
        this.animals = animals
      })
  }

  removeAnimal(animalId: string, index: number) {
    this.http.removeAnimal(animalId)
      .pipe(first())
      .subscribe(value => {
        this.animals.splice(index, 1)
      })
  }
}

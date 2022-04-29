import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Registration} from "../model/registration";
import {environment} from "../../environments/environment";
import {UserDetails} from "../model/user-details";
import {Service} from "../model/service";
import {AnimalGeneral} from "../model/animal-general";
import {AnimalDetails} from "../model/animal-details";
import {UserShortData} from "../model/user-short-data";
import {Animal} from "../model/animal";
import {Visit} from "../model/visit";
import {Comment} from "../model/comment";
import {GeolocationResult} from "../model/geolocation-result";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  register(registrationData: Registration): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/registration`, registrationData)
  }

  getAllUsers(): Observable<UserShortData[]> {
    return this.http.get<UserShortData[]>(`${environment.apiUrl}/users`)
  }

  getAllVets(): Observable<UserShortData[]> {
    return this.http.get<UserShortData[]>(`${environment.apiUrl}/users/vet`)
  }

  getUserDetails(): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${environment.apiUrl}/user`)
  }

  saveUserDetails(userDetails: UserDetails): Observable<string> {
    return this.http.put(`${environment.apiUrl}/user`, userDetails, {observe: 'body', responseType: 'text'})
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.apiUrl}/services`)
  }

  addService(service: Service): Observable<string> {
    return this.http.post(`${environment.apiUrl}/service`, service, {observe: 'body', responseType: 'text'})
  }

  removeService(serviceId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/service/` + serviceId)
  }

  getAnimals(): Observable<AnimalGeneral[]> {
    return this.http.get<AnimalGeneral[]>(`${environment.apiUrl}/animals`)
  }

  getAnimal(animalId: string): Observable<Animal> {
    return this.http.get<Animal>(`${environment.apiUrl}/animal/` + animalId)
  }

  saveAnimal(animal: AnimalDetails): Observable<string> {
    return this.http.put(`${environment.apiUrl}/animal`, animal, {observe: 'body', responseType: 'text'})
  }

  removeAnimal(animalId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/animal/` + animalId)
  }

  addVisit(visit: Visit, animalId: string): Observable<string> {
    return this.http.post(`${environment.apiUrl}/visit?animalId=` + animalId, visit, {observe: 'body', responseType: 'text'})
  }

  removeVisit(visitId: string, animalId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/visit/` + visitId + '?animalId=' + animalId)
  }

  addComment(comment: Comment, animalId: string): Observable<string> {
    return this.http.post(`${environment.apiUrl}/comment?animalId=` + animalId, comment, {observe: 'body', responseType: 'text'})
  }

  removeComment(commentId: string, animalId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/comment/` + commentId + '?animalId=' + animalId)
  }

  getLocationForCoordinates(latitude: number, longitude: number): Observable<GeolocationResult> {
    return this.http.get<GeolocationResult>('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + `${environment.apiKey}`)
  }
}

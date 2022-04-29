import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./helpers/auth.guard";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {ServicesComponent} from "./services/services.component";
import {AddServiceComponent} from "./services/add-service/add-service.component";
import {AnimalsComponent} from "./animals/animals.component";
import {AddAnimalComponent} from "./animals/add-animal/add-animal.component";
import {AnimalDetailsComponent} from "./animals/animal-details/animal-details.component";
import {AddVisitComponent} from "./animals/animal-details/add-visit/add-visit.component";
import {AddCommentComponent} from "./animals/animal-details/add-comment/add-comment.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserDetailsComponent, canActivate: [AuthGuard]},
  {path: 'services', component: ServicesComponent},
  {path: 'addService', component: AddServiceComponent, canActivate: [AuthGuard]},
  {path: 'animals', component: AnimalsComponent, canActivate: [AuthGuard]},
  {path: 'addAnimal', component: AddAnimalComponent, canActivate: [AuthGuard]},
  {path: 'animalDetails/:id', component: AnimalDetailsComponent, canActivate: [AuthGuard]},
  {path: 'addVisit/:id', component: AddVisitComponent, canActivate: [AuthGuard]},
  {path: 'addComment/:id', component: AddCommentComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

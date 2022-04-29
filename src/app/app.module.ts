import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BasicAuthInterceptor} from "./helpers/basic-auth.interceptor";
import {ErrorInterceptor} from "./helpers/error.interceptor";
import { UserDetailsComponent } from './user-details/user-details.component';
import { ServicesComponent } from './services/services.component';
import { AddServiceComponent } from './services/add-service/add-service.component';
import { AnimalsComponent } from './animals/animals.component';
import { AnimalComponent } from './animals/animal/animal.component';
import { AddAnimalComponent } from './animals/add-animal/add-animal.component';
import { AnimalDetailsComponent } from './animals/animal-details/animal-details.component';
import { AddVisitComponent } from './animals/animal-details/add-visit/add-visit.component';
import { AddCommentComponent } from './animals/animal-details/add-comment/add-comment.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideAuth,getAuth } from '@angular/fire/auth';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    UserDetailsComponent,
    ServicesComponent,
    AddServiceComponent,
    AnimalsComponent,
    AnimalComponent,
    AddAnimalComponent,
    AnimalDetailsComponent,
    AddVisitComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    provideAuth(() => getAuth())
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

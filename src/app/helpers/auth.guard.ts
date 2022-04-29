import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../app-services/authentication.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authenticationService.userValue

    if (user) {
      if (route.url[0].path === 'addService') {
        if (user.role === 'ROLE_VET') {
          return true
        }

      } else if (route.url[0].path === 'addVisit') {
        if (user.role === 'ROLE_VET') {
          return true
        }

      } else if (route.url[0].path === 'addComment') {
        if (user.role === 'ROLE_VET') {
          return true
        }

      } else {
        return true
      }
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
    return false
  }
}

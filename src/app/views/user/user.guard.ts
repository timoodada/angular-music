import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserInfoService} from '../../stores/actions/user-info/user-info.service';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private userInfo: UserInfoService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userInfo.isLogin()) {
      return true;
    }
    this.router.navigate(
      ['/user/login'],
      { replaceUrl: true , queryParams: { next: state.url }});
    return false;
  }
}

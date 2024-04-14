import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: AuthService, private router: Router) {
  }
  async canActivate(): Promise<boolean> {
    await this.authService.authRequest;
    const isAuth = this.authService.isAuth
    if(!isAuth) {
      await this.router.navigate(["/login"], {
        queryParams: {
          isAuth: false
        }
      })
    }
    return this.authService.isAuth
  }

}

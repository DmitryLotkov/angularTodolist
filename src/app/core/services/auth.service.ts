import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ICommonResponse, ILoginRequest, ILoginResponse, MeResponse, ResultCodes} from '../../shared/models/core.model';
import {environment} from '../../environment/enviroment.prod';
import {Router} from "@angular/router";
import {catchError, EMPTY} from "rxjs";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false;
  userId!: number;
  resolveAuthRequest: Function = () => {}
  authRequest = new Promise((res) => {
    this.resolveAuthRequest = res
  })

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {
  }

  me() {
    this.http.get<ICommonResponse<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this))).subscribe((res) => {
      if (res.resultCode === ResultCodes.success) {
        this.isAuth = true;
      }
      this.resolveAuthRequest()
    });
  }

  login(data: ILoginRequest) {
    this.http.post<ICommonResponse<ILoginResponse>>(`${environment.baseUrl}/auth/login`, {...data})
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {
          if (res.resultCode === ResultCodes.success) {
            this.userId = res.data.userId;
            this.router.navigate(["/"])
          } else {
            this.notificationService.handleError(res.messages[0])
          }
        },
      );
  }

  logOut() {
    this.http.delete<ICommonResponse>(`${environment.baseUrl}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this))).subscribe((res) => {
      if (res.resultCode === ResultCodes.success) {
        this.router.navigate(["/login"])
      } else {
        this.notificationService.handleError(res.messages[0])
      }
    })
  }

  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}

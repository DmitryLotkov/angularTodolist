import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICommonResponse, ILoginRequest, ILoginResponse, MeResponse, ResultCodes} from '../../shared/models/core.model';
import {environment} from '../../environment/enviroment.prod';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false;
  userId!: number;

  constructor(private http: HttpClient, private router: Router) {
  }

  me() {
    this.http.get<ICommonResponse<MeResponse>>(`${environment.baseUrl}/auth/me`).subscribe((res) => {
      if (res.resultCode === ResultCodes.success) {
        this.isAuth = true;
      }
    });
  }

  login(data: ILoginRequest) {
    this.http.post<ICommonResponse<ILoginResponse>>(`${environment.baseUrl}/auth/login`, {...data}).subscribe((res) => {
        if (res.resultCode === ResultCodes.success) {
          this.userId = res.data.userId;
          this.router.navigate([""])
        }
      },
    );
  }
}

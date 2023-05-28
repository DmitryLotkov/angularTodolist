import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {Form, ILoginRequest} from "../../../shared/models/core.model";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  passMinLength = 3
  loginForm!: FormGroup<Form<ILoginRequest>>


  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup<Form<ILoginRequest>>({
      email: new FormControl<string>("", {
          nonNullable: true, validators: [Validators.required,
            Validators.minLength(4),
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/)]
        }
      ),
      password: new FormControl<string>("", {
          nonNullable: true, validators: [
            Validators.required,
            Validators.minLength(this.passMinLength)
          ]
        }
      ),
      rememberMe: new FormControl<boolean>(true, {nonNullable: true,})
    });

  }

  dispatchInputData() {
    this.authService.login(this.loginForm.getRawValue())
    this.loginForm.reset()

  }

  get email() {
    return this.loginForm.get('email')
  }

  get pass() {
    return this.loginForm.get('password')
  }



}

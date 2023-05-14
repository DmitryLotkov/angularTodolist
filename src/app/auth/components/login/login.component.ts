import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  passMinLength = 3
  loginForm!: FormGroup


  constructor(private authService: AuthService) {
  }
  dispatchInputData() {
    this.authService.login(this.loginForm.value)
    this.loginForm.reset()

  }
  get email(){
    return this.loginForm.get('email')
  }
  get pass(){
    return this.loginForm.get('password')
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl<string | null>("", [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/)
      ]),
      password: new FormControl<string | null>("", [
        Validators.required,
        Validators.minLength(this.passMinLength),
      ]),
      rememberMe: new FormControl<boolean | null>(true)
    })
  }
}

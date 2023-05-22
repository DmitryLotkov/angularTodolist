import {FormControl, FormGroup} from "@angular/forms";

export interface ICommonResponse<T = {}> {
  data: T;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
}
export enum ResultCodes {
  success = 0,
  error = 1
}

export interface MeResponse {
  data: {
    id: number,
    login: string
    email: string
  }
}
export interface ILoginResponse {
    userId: number
}
export interface ILoginRequest {
  email: string
  password: string
  rememberMe: boolean
}
export type Form<T> = {
  [P in keyof T]: T[P] extends 'object' ? FormGroup<Form<T[P]>> : FormControl<T[P]>;
};

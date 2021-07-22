import HTTP from '../modules/http/inedx';

const http = new HTTP('https://ya-praktikum.tech/api/v2/auth');

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegistrationRequest {
  first_name: string;
  second_name: string;
  phone: string;
  login: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface IUser {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string
}

export class AuthAPI {
  static signin(loginForm: LoginRequest): Promise<XMLHttpRequest> {
    return http.post('/signin', { data: { ...loginForm } });
  }

  static user(): Promise<XMLHttpRequest> {
    return http.get('/user');
  }

  static logout(): Promise<XMLHttpRequest> {
    return http.post('/logout');
  }

  static signup(user: RegistrationRequest): Promise<XMLHttpRequest> {
    return http.post('/signup', { data: { ...user } });
  }
}

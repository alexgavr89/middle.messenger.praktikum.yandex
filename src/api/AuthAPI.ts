import HTTP from '../modules/http/inedx';

const http = new HTTP('https://ya-praktikum.tech/api/v2/auth');

export interface ILoginRequest {
  login: string;
  password: string;
}

export interface IRegistrationRequest {
  first_name: 'string';
  second_name: 'string';
  phone: 'string';
  login: 'string';
  email: 'string';
  password: 'string';
  password_confirm: 'string';
}

export class AuthAPI {
  static signin(user: ILoginRequest): Promise<XMLHttpRequest> {
    return http.post('/signin', { data: user });
  }

  static user(): Promise<XMLHttpRequest> {
    return http.get('/user');
  }

  static logout(): Promise<XMLHttpRequest> {
    return http.post('/logout');
  }

  static signup(user: IRegistrationRequest): Promise<XMLHttpRequest> {
    return http.post('/signup', { data: user });
  }
}

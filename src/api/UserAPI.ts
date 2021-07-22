import HTTP from '../modules/http/inedx';

const http = new HTTP('https://ya-praktikum.tech/api/v2/user');

export interface ProfileProps {
  first_name: string;
  second_name: string;
  login: string;
  phone: string;
  email: string;
  display_name: string;
}

export interface PasswordProps {
  oldPassword: string;
  newPassword: string;
}

export class UserAPI {
  static changeAvatar(avatar: FormData): Promise<XMLHttpRequest> {
    return http.put('/profile/avatar', { data: { form: avatar } });
  }

  static changeProfile(profile: ProfileProps): Promise<XMLHttpRequest> {
    return http.put('/profile', { data: { ...profile } });
  }

  static changePassword(password: PasswordProps): Promise<XMLHttpRequest> {
    return http.put('/password', { data: { ...password } });
  }

  static search(login: string): Promise<XMLHttpRequest> {
    return http.post('/search', { data: { login } });
  }
}

import { AuthAPI, LoginRequest } from '../api/AuthAPI';
import Store from '../modules/store';
import Validate from '../utils/validate';
import Router from '../modules/router';

const store = Store.getInstance();
const router = Router.getInstance();

export default class AuthController {
  login(form: LoginRequest): void {
    const checkLogin = Validate.isNotEmpty(form.login);
    const checkPassword = Validate.isPassword(form.password);

    if (checkLogin && checkPassword) {
      AuthAPI.signin(form)
        .then((result) => {
          if (result.status) {
            this.getUser();

            router.go('/messenger');
          }

          return result;
        })
        .catch(() => {
          router.go('/server-error');
        });
    } else {
      if (!checkLogin) {
        throw new Error('Пожалуйста, укажите имя');
      }

      if (!checkPassword) {
        throw new Error('Пожалуйста, укажите пароль');
      }
    }
  }

  getUser(): void {
    AuthAPI.user()
      .then((result) => {
        if (result.status === 200) {
          store.setProps({ user: JSON.parse(result.response) });
        } else {
          router.go('/server-error');
        }

        return result;
      })
      .catch(() => {
        router.go('/server-error');
      });
  }

  checkAuth(): void {
    AuthAPI.user()
      .then((result) => {
        if (result.status === 200) {
          store.setProps({ user: JSON.parse(result.response) });

          router.go('/messenger');
        } else {
          switch (window.location.pathname) {
            case '/':
              router.start('/login');
              break;

            case '/login':
              router.start('/login');
              break;

            case '/registration':
              router.start('/registration');
              break;

            case '/messenger':
              router.start('/login');
              break;

            default:
              router.start('/not-found');
              break;
          }
        }

        return true;
      })
      .catch(() => {
        router.go('/server-error');
      });
  }
}

import { AuthAPI, LoginRequest } from '../api/AuthAPI';
import Store from '../modules/store';
import Validate from '../utils/validate';
import Router from '../modules/router';

const store = Store.getInstance();
const router = Router.getInstance();

export default class AuthController {
  static login(form: LoginRequest): void {
    const { login, password } = this.props.components;

    const checkLogin = Validate.isNotEmpty(form.login);
    const checkPassword = Validate.isPassword(form.password);

    if (login.props.components.error.get().length > 0) {
      login.props.components.error.clear();
    }

    if (password.props.components.error.get().length > 0) {
      password.props.components.error.clear();
    }

    if (checkLogin && checkPassword) {
      AuthAPI.signin(form)
        .then((result) => {
          switch (result.status) {
            case 200:
              AuthController.getUser();
              break;
            case 400:
              break;
            case 401:
              password.props.components.error.print('Неправильный логин или пароль');
              break;
            default:
              break;
          }

          return true;
        })
        .catch(() => {
          router.go('/server-error');
        });
    } else {
      if (checkLogin) {
        login.props.components.error.clear();
      } else {
        login.props.components.error.print('Пожалуйста, укажите имя');
      }

      if (checkPassword) {
        password.props.components.error.clear();
      } else {
        password.props.components.error.print('Пожалуйста, укажите пароль');
      }
    }
  }

  static getUser(): void {
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

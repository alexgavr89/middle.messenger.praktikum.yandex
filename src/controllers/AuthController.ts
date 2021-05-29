import 'regenerator-runtime/runtime';
import { AuthAPI, ILoginRequest } from '../api/AuthAPI';
import Store from '../modules/store';
import { Block } from '../modules/block';
import Validate from '../utils/validate';
import Router from '../modules/router';
import escape from '../utils/escape';

const store = Store.getInstance({});
const router = Router.getInstance();

export default class AuthController {
  static login(form: ILoginRequest, block: Block): void {
    const checkLogin = Validate.isNotEmpty(form.login);
    const checkPassword = Validate.isPassword(form.password);

    const data = Object.keys(form).reduce((acc, key) => {
      acc[key] = escape(form[key]);
      return acc;
    }, {});

    if (checkLogin && checkPassword) {
      try {
        AuthAPI.signin(data).then((result) => {
          if (result.status === 200) {
            AuthController.getUser();
          }
        });
      } catch {
        //
      }
    } else {
      if (!checkLogin) {
        block.props.login.props.error.show();
      } else {
        block.props.login.props.error.hide();
      }

      if (!checkPassword) {
        block.props.password.props.error.show();
      } else {
        block.props.password.props.error.hide();
      }
    }
  }

  static getUser(): void {
    AuthAPI.user().then((result) => {
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
    });
  }
}

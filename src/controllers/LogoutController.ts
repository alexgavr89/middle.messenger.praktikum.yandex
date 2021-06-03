import 'regenerator-runtime/runtime';
import Router from '../modules/router';
import { AuthAPI } from '../api/AuthAPI';

const router = Router.getInstance();

export default class LogoutController {
  static logout(): void {
    AuthAPI.logout()
      .then((result) => {
        if (result.status === 200) {
          router.go('/login');
        }

        return true;
      })
      .catch(() => {
        router.go('/server-error');
      });
  }
}

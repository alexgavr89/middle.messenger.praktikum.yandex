import Router from '../modules/router';
import { AuthAPI, RegistrationRequest } from '../api/AuthAPI';
import Store from '../modules/store';
import Validate from '../utils/validate';
import AuthController from './AuthController';

const router = Router.getInstance();
const store = Store.getInstance();
const authController = new AuthController();

export default class RegistrationController {
  registration(form: RegistrationRequest): void {
    const checkFirstName = Validate.isNotEmpty(form.first_name);
    const checkSecondName = Validate.isNotEmpty(form.second_name);
    const checkPhone = Validate.isPhone(form.phone);
    const checkLogin = Validate.isNotEmpty(form.login);
    const checkMail = Validate.isEmail(form.email);
    const checkPassword = Validate.isPassword(form.password);

    const validConfirm = Validate.isConfirmPssword(form.password, form.password_confirm);

    if (
      checkFirstName
      && checkSecondName
      && checkPhone
      && checkLogin
      && checkMail
      && checkPassword
      && validConfirm
    ) {
      AuthAPI.signup(form)
        .then((result) => {
          if (result.status === 200) {
            store.setProps({ user: JSON.parse(result.response) });

            authController.getUser();

            router.go('/messenger');
          }

          return true;
        })
        .catch(() => {
          router.go('/server-error');
        });
    } else {
      if (!checkFirstName) {
        throw new Error('Пожалуйста, укажите имя');
      }

      if (!checkSecondName) {
        throw new Error('Пожалуйста, укажите фамилию');
      }

      if (!checkPhone) {
        throw new Error('Пожалуйста, укажите номер телефона');
      }

      if (!checkLogin) {
        throw new Error('Пожалуйста, укажите логин');
      }

      if (!checkMail) {
        throw new Error('Пожалуйста, укажите почту');
      }

      if (!checkPassword) {
        throw new Error('Пожалуйста, укажите пароль длиннее 6 знаков');
      }

      if (!validConfirm) {
        throw new Error('Пароли не совпадают');
      }
    }
  }
}

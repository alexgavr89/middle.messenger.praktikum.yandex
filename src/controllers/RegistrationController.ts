import Router from '../modules/router';
import { AuthAPI, RegistrationRequest } from '../api/AuthAPI';
import Store from '../modules/store';
import Validate from '../utils/validate';
import AuthController from './AuthController';

const router = Router.getInstance();
const store = Store.getInstance();

export default class RegistrationController {
  static registration(form: RegistrationRequest): void {
    const {
      firstName,
      secondName,
      phone,
      login,
      mail,
      password,
      confirmPassword,
    } = this.props.components;

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

            AuthController.getUser();

            router.go('/messenger');
          }

          return true;
        })
        .catch(() => {
          router.go('/server-error');
        });
    } else {
      if (checkFirstName) {
        firstName.props.components.error.clear();
      } else {
        firstName.components.props.error.print('Пожалуйста, укажите имя');
      }

      if (checkSecondName) {
        secondName.props.components.error.clear();
      } else {
        secondName.props.components.error.print('Пожалуйста, укажите фамилию');
      }

      if (checkPhone) {
        phone.props.components.error.clear();
      } else {
        phone.props.components.error.print('Пожалуйста, укажите номер телефона');
      }

      if (checkLogin) {
        login.props.components.error.clear();
      } else {
        login.props.components.error.print('Пожалуйста, укажите логин');
      }

      if (checkMail) {
        mail.props.components.error.clear();
      } else {
        mail.props.components.error.print('Пожалуйста, укажите почту');
      }

      if (checkPassword) {
        password.props.components.error.clear();
      } else {
        password.props.components.error.print('Пожалуйста, укажите пароль длиннее 6 знаков');
      }

      if (!validConfirm) {
        confirmPassword.props.components.error.clear();
      } else {
        confirmPassword.props.components.error.print('Пароли не совпадают');
      }
    }
  }
}

import 'regenerator-runtime/runtime';
import { Block } from '../modules/block';
import Router from '../modules/router';
import { AuthAPI, IRegistrationRequest } from '../api/AuthAPI';
import Store from '../modules/store';
import Validate from '../utils/validate';

const router = Router.getInstance();
const store = Store.getInstance({});

export default class RegistrationController {
  static registration(form: IRegistrationRequest, block: Block): void {
    const checkFirstName = Validate.isNotEmpty(form.first_name);
    const checkSecondName = Validate.isNotEmpty(form.second_name);
    const checkPhone = Validate.isPhone(form.phone);
    const checkLogin = Validate.isNotEmpty(form.login);
    const checkMail = Validate.isEmail(form.email);
    const checkPassword = Validate.isPassword(form.password);

    const validConfirm = Validate.isConfirmPssword(
      form.password,
      form.password_confirm,
    );

    const data = Object.keys(form).reduce((acc, key) => {
      acc[key] = escape(form[key]);
      return acc;
    }, {});

    if (
      checkFirstName
      && checkSecondName
      && checkPhone
      && checkLogin
      && checkMail
      && checkPassword
      && validConfirm
    ) {
      try {
        AuthAPI.signup(data).then((result) => {
          if (result.status === 200) {
            store.setProps({ user: JSON.parse(result.response) });

            router.go('/messenger');
          }
        });
      } catch {
        //
      }
    } else {
      if (!checkFirstName) {
        block.props.firstName.props.error.show();
      } else {
        block.props.firstName.props.error.hide();
      }

      if (!checkSecondName) {
        block.props.secondName.props.error.show();
      } else {
        block.props.secondName.props.error.hide();
      }

      if (!checkPhone) {
        block.props.phone.props.error.show();
      } else {
        block.props.phone.props.error.hide();
      }

      if (!checkLogin) {
        block.props.login.props.error.show();
      } else {
        block.props.login.props.error.hide();
      }

      if (!checkMail) {
        block.props.mail.props.error.show();
      } else {
        block.props.mail.props.error.hide();
      }

      if (!checkPassword) {
        block.props.password.props.error.show();
      } else {
        block.props.password.props.error.hide();
      }

      if (!validConfirm) {
        block.props.confirmPassword.props.error.show();
      } else {
        block.props.confirmPassword.props.error.hide();
      }
    }
  }
}

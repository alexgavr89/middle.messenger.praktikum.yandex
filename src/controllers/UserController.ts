import 'regenerator-runtime/runtime';
import { UserAPI, IPasswordProps, IProfileProps } from '../api/UserAPI';
import Store from '../modules/store';
import { Block } from '../modules/block';
import Validate from '../utils/validate';

const store = Store.getInstance({});

export default class UserController {
  static async changeAvatar(form: HTMLFormElement): Promise<void> {
    UserAPI.changeAvatar(new FormData(form)).then((resp) => {
      store.setProps({ user: JSON.parse(resp.response) });
    });
  }

  static changePassword(form: IPasswordProps, block: Block): void {
    const checkOldPassword = Validate.isPassword(form.oldPassword);
    const checkNewPassword = Validate.isNotEqualPasswords(
      form.oldPassword,
      form.newPassword,
    );

    if (checkOldPassword && checkNewPassword) {
      try {
        UserAPI.changePassword(form);
      } catch {
        //
      }
    } else {
      if (!checkOldPassword) {
        block.props.oldPassword.props.error.show();
      }

      if (!checkNewPassword) {
        block.props.newPassword.props.error.show();
      }
    }
  }

  static async changeProfile(form: IProfileProps, block: Block): Promise<void> {
    const data = { ...form };

    const checkPhone = Validate.isPhone(data.phone) || Validate.isEmpty(data.phone);
    const checkMail = Validate.isEmail(data.email) || Validate.isEmpty(data.email);

    if (checkPhone && checkMail) {
      if (Validate.isEmpty(data.first_name)) {
        data.first_name = store.props.user.first_name;
      }

      if (Validate.isEmpty(data.second_name)) {
        data.second_name = store.props.user.second_name;
      }

      if (Validate.isEmpty(data.login)) {
        data.login = store.props.user.login;
      }

      if (Validate.isEmpty(data.phone)) {
        data.phone = store.props.user.phone;
      }

      if (Validate.isEmpty(data.email)) {
        data.email = store.props.user.email;
      }

      data.display_name = `${data.first_name} ${data.second_name}`;

      try {
        const xhr = await UserAPI.changeProfile(data);
        if (xhr.status === 200) {
          store.setProps({ user: JSON.parse(xhr.response) });
        }
      } catch {
        //
      }
    } else {
      if (!checkPhone) {
        block.props.phone.props.error.show();
      }
      if (!checkMail) {
        block.props.mail.props.error.show();
      }
    }
  }

  static search(chatId: number): void {
    const login = store.props.searchUserInput;

    if (Validate.isNotEmpty(login as string)) {
      try {
        UserAPI.search(login as string).then((result) => {
          if (result.status === 200) {
            store.setProps({
              [`users_${chatId}`]: JSON.parse(result.response),
            });
          }
        });
      } catch {
        //
      }
    }
  }
}

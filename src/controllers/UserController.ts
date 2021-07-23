import { UserAPI, PasswordProps, ProfileProps } from '../api/UserAPI';
import Store from '../modules/store';
import Validate from '../utils/validate';
import Router from '../modules/router';

const store = Store.getInstance();
const router = Router.getInstance();

export default class UserController {
  async changeAvatar(form: HTMLFormElement): Promise<void> {
    UserAPI.changeAvatar(new FormData(form))
      .then((result) => {
        const response = JSON.parse(result.response);

        store.setProps({
          user: {
            avatar: response.avatar,
          },
        });

        return true;
      })
      .catch(() => {
        router.go('/server-error');
      });
  }

  changePassword(form: PasswordProps): void {
    const checkOldPassword = Validate.isPassword(form.oldPassword);
    const checkNewPassword = Validate.isNotEqualPasswords(form.oldPassword, form.newPassword);

    if (checkOldPassword && checkNewPassword) {
      UserAPI.changePassword(form);
    } else {
      if (!checkOldPassword) {
        throw new Error('Error old password');
      }

      if (!checkNewPassword) {
        throw new Error('Error new password');
      }
    }
  }

  changeProfile(form: ProfileProps): void {
    const checkPhone = Validate.isPhone(form.phone) || Validate.isEmpty(form.phone);
    const checkMail = Validate.isEmail(form.email) || Validate.isEmpty(form.email);

    if (checkPhone && checkMail) {
      if (Validate.isEmpty(form.first_name)) {
        form.first_name = store.get('user.first_name') as string;
      }

      if (Validate.isEmpty(form.second_name)) {
        form.second_name = store.get('user.second_name') as string;
      }

      if (Validate.isEmpty(form.login)) {
        form.login = store.get('user.login') as string;
      }

      if (Validate.isEmpty(form.phone)) {
        form.phone = store.get('user.phone') as string;
      }

      if (Validate.isEmpty(form.email)) {
        form.email = store.get('user.email') as string;
      }

      UserAPI.changeProfile(form)
        .then((result) => {
          if (result.status === 200) {
            store.setProps({
              user: JSON.parse(result.response),
            });
          }

          return true;
        })
        .catch(() => {
          router.go('/server-error');
        });
    } else {
      if (!checkPhone) {
        throw new Error('Пожалуйста, укажите номер телефона');
      }

      if (!checkMail) {
        throw new Error('Пожалуйста, укажите почту');
      }
    }
  }

  search(chatId: number, login: string): void {
    if (Validate.isNotEmpty(login)) {
      UserAPI.search(login)
        .then((result) => {
          if (result.status === 200) {
            store.deleteProps({
              [`users_search_list_${chatId}`]: '',
            });

            store.setProps({
              [`users_search_list_${chatId}`]: JSON.parse(result.response),
            });
          }

          return true;
        })
        .catch(() => {
          router.go('/server-error');
        });
    }
  }
}

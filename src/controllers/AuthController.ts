import 'regenerator-runtime/runtime';
import { AuthAPI, ILoginRequest } from '../api/AuthAPI';
import Store from '../modules/store';
import { Block } from '../modules/block';
import Validate from '../utils/validate';
import Router from '../modules/router';
import escape from '../utils/escape';

const store = Store.getInstance();
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
			AuthAPI.signin(data)
				.then((result) => {
					if (result.status === 200) {
						AuthController.getUser();
					}

					return true;
				})
				.catch(() => {
					router.go('/server-error');
				});
		} else {
			if (checkLogin) {
				block.props.login.props.error.hide();
			} else {
				block.props.login.props.error.show();
			}

			if (checkPassword) {
				block.props.password.props.error.hide();
			} else {
				block.props.password.props.error.show();
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

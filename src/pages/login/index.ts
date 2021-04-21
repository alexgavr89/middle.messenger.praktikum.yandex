import {render} from '../../utils/render-dom';
import Input from '../../components/input-block/input';
import InputBlock from '../../components/input-block';
import InputLabel from '../../components/input-block/input-label';
import InputError from '../../components/input-block/input-error';
import FormBlock from '../../components/form-block';
import App from '../../components/app';
import FormLogin from '../../components/form-login';
import Button from '../../components/button';
import Link from '../../components/link';
import validator from '../../utils/validator';

export default function view() {
    const mailLabel = new InputLabel({
        id: 'mail',
        label: 'Почта',
    });
    const mailInput = new Input({
        id: 'mail',
        type: 'text',
        placeholder: 'Логин',
        events: {
            focus: event => {
                mailLabel.show();
            },
            blur: event => {
                if (event.target.value.length === 0) {
                    mailLabel.hide();
                }

                if (validator('email', event.target.value)) {
                    mailError.show();
                } else {
                    mailError.hide();
                }
            }
        },
        setting: {
            wrapStyle: ['input-block'],
        },
    });
    const mailError = new InputError({
        error: 'Пожалуйста, укажите почту',
    });

    const mail = new InputBlock({
        label: mailLabel,
        input: mailInput,
        error: mailError,
        stylesWrap: ['input-block'],
    });

    const passwordLabel = new InputLabel({
        id: 'password',
        label: 'Пароль',
    });
    const passwordInput = new Input({
        id: 'password',
        type: 'password',
        placeholder: 'Пароль',
        events: {
            focus: event => {
                passwordLabel.show();
            },
            blur: event => {
                if (event.target.value.length === 0) {
                    passwordLabel.hide();
                }

                if (validator('password', event.target.value)) {
                    passwordError.show();
                } else {
                    passwordError.hide();
                }
            }
        },
    });
    const passwordError = new InputError({
        error: 'Пожалуйста, укажите пароль',
    });

    const password = new InputBlock({
        label: passwordLabel,
        input: passwordInput,
        error: passwordError,
        stylesWrap: ['input-block'],
    });

    const app = new App({
        app: new FormBlock({
            title: 'Вход',
            form: new FormLogin({
                mail,
                password,
                button: new Button({
                    title: 'Далее',
                    type: 'submit',
                    class: 'btn__form',
                    stylesWrap: ['btn'],
                }),
                events: {
                    submit: event => {
                        event.preventDefault();

                        const mail = event.target.elements.mail.value;
                        const password = event.target.elements.password.value;

                        const checkMail = validator('email', mail);
                        const checkPassword = validator('password', password);

                        if (!checkMail && !checkPassword) {
                            console.log('Отправить форму');
                        } else {
                            if (checkMail) {
                                mailError.show();
                            } else {
                                mailError.hide()
                            }

                            if (checkPassword) {
                                passwordError.show();
                            } else {
                                passwordError.hide();
                            }
                        }
                    },
                }
            }),
            link: new Link({
                title: 'Нет аккаунта?',
                href: 'registration.html',
                stylesWrap: ['link'],
            }),
            stylesWrap: ['form-block'],
        }),
        stylesWrap: ['app'],
    });

    document.title = 'Вход';

    render('body', app);
}

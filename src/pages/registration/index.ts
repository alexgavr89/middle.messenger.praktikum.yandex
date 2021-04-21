import {render} from '../../utils/render-dom';
import Input from '../../components/input-block/input';
import InputBlock from '../../components/input-block';
import InputLabel from '../../components/input-block/input-label';
import InputError from '../../components/input-block/input-error';
import FormBlock from '../../components/form-block';
import App from '../../components/app';
import FormRegistration from '../../components/form-registration';
import Button from '../../components/button';
import Link from '../../components/link';
import validator from '../../utils/validator';

export default function view() {
    const nameLabel = new InputLabel({
        id: 'text',
        label: 'Имя',
    });
    const nameInput = new Input({
        id: 'name',
        type: 'text',
        placeholder: 'Имя',
        events: {
            focus: event => {
                nameLabel.show();
            },
            blur: event => {
                if (event.target.value.length === 0) {
                    nameLabel.hide();
                }

                if (validator('filled', event.target.value)) {
                    nameError.show();
                } else {
                    nameError.hide();
                }
            }
        },
        setting: {
            wrapStyle: ['input-block'],
        },
    });
    const nameError = new InputError({
        error: 'Пожалуйста, укажите имя',
    });
    const name = new InputBlock({
        label: nameLabel,
        input: nameInput,
        error: nameError,
        stylesWrap: ['input-block'],
    });

    const lastnameLabel = new InputLabel({
        id: 'text',
        label: 'Фамилия',
    });
    const lastnameInput = new Input({
        id: 'lastname',
        type: 'text',
        placeholder: 'Фамилия',
        events: {
            focus: event => {
                lastnameLabel.show();
            },
            blur: event => {
                if (event.target.value.length === 0) {
                    lastnameLabel.hide();
                }

                if (validator('filled', event.target.value)) {
                    lastnameError.show();
                } else {
                    lastnameError.hide();
                }
            }
        },
        setting: {
            wrapStyle: ['input-block'],
        },
    });
    const lastnameError = new InputError({
        error: 'Пожалуйста, укажите фамилию',
    });
    const lastname = new InputBlock({
        label: lastnameLabel,
        input: lastnameInput,
        error: lastnameError,
        stylesWrap: ['input-block'],
    });

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
        error: 'Пожалуйста, укажите пароль длиннее 6 знаков',
    });
    const password = new InputBlock({
        label: passwordLabel,
        input: passwordInput,
        error: passwordError,
        stylesWrap: ['input-block'],
    });

    const confirmPasswordLabel = new InputLabel({
        id: 'confirmPassword',
        label: 'Повторите пароль',
    });
    const confirmPasswordInput = new Input({
        id: 'confirmPassword',
        type: 'password',
        placeholder: 'Повторите пароль',
        events: {
            focus: event => {
                confirmPasswordLabel.show();
            },
            blur: event => {
                if (event.target.value.length === 0) {
                    confirmPasswordLabel.hide();
                }

                const password = document.querySelector('#password');

                if (
                    validator('password', event.target.value) ||
                    event.target.value !== password.value
                ) {
                    confirmPasswordError.show();
                } else {
                    confirmPasswordError.hide();
                }
            }
        },
    });
    const confirmPasswordError = new InputError({
        error: 'Пароли не совпадают',
    });
    const confirmPassword = new InputBlock({
        label: confirmPasswordLabel,
        input: confirmPasswordInput,
        error: confirmPasswordError,
        stylesWrap: ['input-block'],
    });

    const app = new App({
        app: new FormBlock({
            title: 'Регистрация',
            form: new FormRegistration({
                name,
                lastname,
                mail,
                password,
                confirmPassword,
                button: new Button({
                    title: 'Далее',
                    type: 'submit',
                    class: 'btn__form',
                    stylesWrap: ['btn'],
                }),
                events: {
                    submit: event => {
                        event.preventDefault();

                        const name = event.target.elements.name.value
                        const lastname = event.target.elements.lastname.value
                        const mail = event.target.elements.mail.value;
                        const password = event.target.elements.password.value;
                        const confirmPassword = event.target.elements.confirmPassword.value;

                        const checkName = validator('filled', name);
                        const checkLastname = validator('filled', lastname);
                        const checkMail = validator('email', mail);
                        const checkPassword = validator('password', password);

                        const checkConfirmPassword = validator('password', confirmPassword) || password !== confirmPassword;

                        if (
                            !checkName &&
                            !checkLastname &&
                            !checkMail &&
                            !checkPassword &&
                            !checkConfirmPassword
                        ) {
                            console.log('Отправить форму');
                        } else {
                            if (checkName) {
                                nameError.show();
                            } else {
                                nameError.hide()
                            }

                            if (checkLastname) {
                                lastnameError.show();
                            } else {
                                lastnameError.hide()
                            }

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

                            if (checkConfirmPassword) {
                                confirmPasswordError.show();
                            } else {
                                confirmPasswordError.hide();
                            }
                        }
                    },
                }
            }),
            link: new Link({
                title: 'Войти',
                href: 'index.html',
                events: {
                    click: event => {
                        event.preventDefault();
                        location.hash = 'login';
                    }
                },
                stylesWrap: ['link'],
            }),
            stylesWrap: ['form-block'],
        }),
        stylesWrap: ['app'],
    });

    render('body', app);
};

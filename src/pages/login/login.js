import '../main.scss';
import app from '../../../src/components/app/app';
import form from '../../../src/components/form/form';
import input from '../../components/input/input';
import button from '../../components/button/button';
import link from '../../components/link/link';

let body = document.querySelector('body');

body
    .insertAdjacentHTML('afterbegin', app());

body
    .querySelector('.app')
    .insertAdjacentHTML('afterbegin', form({title: 'Вход'}));

const formLogin = body.querySelector('form');
formLogin.insertAdjacentHTML('afterbegin', input.tmpl({
    field: [
        {
            id: 'mail',
            type: 'text',
            placeholder: 'Логин',
            label: 'Логин',
            error: 'Пожалуйста, укажите почту',
        },
        {
            id: 'password',
            type: 'password',
            placeholder: 'Пароль',
            label: 'Пароль',
            error: 'Неверный логин или пароль',
        },
    ]
}));
formLogin.insertAdjacentHTML('beforeend', button.tmpl({
    type: 'submit',
    title: 'Авторизоваться',
    class: 'btn__form',
}));

formLogin
    .querySelector('.btn__form')
    .addEventListener('click', button.handlerSubmitLogin);

for (let item of formLogin) {
    if (item.tagName === 'INPUT') {
        item.addEventListener('focus', input.handlerFocus);
        item.addEventListener('blur', input.handlerBlur);
        item.addEventListener('input', input.handlerInput);
    }

    if (item.id === 'mail') {
        item.addEventListener('blur', input.handlerBlurMail);
        item.addEventListener('blur', input.handlerBlurMail);
    }

    if (item.id === 'password') {
        item.addEventListener('blur', input.handlerCheckLength);
    }
}

const formBottom = body.querySelector('.form__bottom');
formBottom.insertAdjacentHTML('afterbegin', link.tmpl({
    title: 'Нет аккаунта?',
    href: 'register.html',
}));
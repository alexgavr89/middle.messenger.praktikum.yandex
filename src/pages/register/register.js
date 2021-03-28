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
    .insertAdjacentHTML('afterbegin', form({title: 'Регистрация'}));

const formRegister = body.querySelector('form');
formRegister.insertAdjacentHTML('afterbegin', input.tmpl({
    field: [
        {
            id: 'mail',
            type: 'text',
            placeholder: 'Почта',
            label: 'Почта',
            error: 'Пожалуйста, укажите почту',
        },
        {
            id: 'name',
            type: 'text',
            placeholder: 'Имя',
            label: 'Имя',
            error: 'Пожалуйста, укажите имя',
        },
        {
            id: 'second_name',
            type: 'text',
            placeholder: 'Фамилия',
            label: 'Фамилия',
            error: 'Пожалуйста, укажите имя',
        },
        {
            id: 'password',
            type: 'password',
            placeholder: 'Пароль',
            label: 'Пароль',
            error: 'Пожалуйста, укажите пароль длиннее 6 знаков',
        },
        {
            id: 'confirm_password',
            type: 'password',
            placeholder: 'Повторите пароль',
            label: 'Повторите пароль',
            error: 'Пароли не совпадают',
        },
    ]
}));
formRegister.insertAdjacentHTML('beforeend', button.tmpl({
    type: 'submit',
    title: 'Зарегистрироваться',
    class: 'btn__form',
}));

formRegister
    .querySelector('.btn__form')
    .addEventListener('click', button.handlerSubmitRegister);

for (let item of formRegister) {
    if (item.tagName === 'INPUT') {
        item.addEventListener('focus', input.handlerFocus);
        item.addEventListener('blur', input.handlerBlur);
        item.addEventListener('input', input.handlerInput);
    }

    if (item.id === 'mail') {
        item.addEventListener('blur', input.handlerBlurMail);
    }

    if (item.id === 'name' || item.id === 'second_name') {
        item.addEventListener('blur', input.handlerCheckEmpty);
    }

    if (item.id === 'password') {
        item.addEventListener('blur', input.handlerCheckLength);
    }

    if (item.id === 'confirm_password') {
        item.addEventListener('blur', input.handlerConfirmPassword);
    }
}

const formBottom = body.querySelector('.form__bottom');
formBottom.insertAdjacentHTML('afterbegin', link.tmpl({
    title: 'Войти',
    href: 'index.html',
}));


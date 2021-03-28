import Handlebars from 'handlebars';

const fs = require('fs');
import './button.scss';

const buttonTmpl = fs.readFileSync('./src/components/button/button.hbs', 'utf8');
const tmpl = Handlebars.compile(buttonTmpl);

function handlerSubmitLogin(e) {
    e.preventDefault();

    const mail = document.querySelector('#mail');
    const password = document.querySelector('#password');

    if (
        mail.value.length > 0 &&
        password.value.length > 0
    ) {
        console.log(`Логин: ${mail.value}`);
        console.log(`Пароль: ${password.value}`);

        setTimeout(() => {
            document.location.href = 'messenger.html';
        }, 5000);
    } else {
        const passwordError = password.nextElementSibling;
        passwordError
            .classList
            .add('active');

        setTimeout(() => {
            passwordError
                .classList
                .remove('active');
        }, 3000);
    }

}

function handlerSubmitRegister(e) {
    e.preventDefault();

    const fieldMail = document.querySelector('#mail');
    const fieldName = document.querySelector('#name');
    const fieldSecondName = document.querySelector('#second_name');
    const fieldPassword = document.querySelector('#password');
    const fieldConfirmPassword = document.querySelector('#confirm_password');

    if (
        fieldMail.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i) &&
        fieldName.value.length > 0 &&
        fieldSecondName.value.length > 0 &&
        fieldPassword.value.length > 5 &&
        fieldConfirmPassword.value === fieldPassword.value
    ) {
        console.log(`Почта: ${fieldMail.value}`);
        console.log(`Имя: ${fieldName.value}`);
        console.log(`Фамилия: ${fieldSecondName.value}`);
        console.log(`Пароль: ${fieldPassword.value}`);
        console.log(`Повтор пароля: ${fieldConfirmPassword.value}`);

        setTimeout(() => {
            document.location.href = 'messenger.html';
        }, 5000);
    }
}

export default {
    tmpl,
    handlerSubmitLogin,
    handlerSubmitRegister,
};
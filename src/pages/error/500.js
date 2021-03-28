import '../main.scss';
import app from '../../../src/components/app/app';
import error from '/../../src/components/error/error';
import link from '/../../src/components/link/link'

let body = document.querySelector('body');

body
    .insertAdjacentHTML('afterbegin', app());

body
    .querySelector('.app')
    .insertAdjacentHTML('afterbegin', error.tmpl({
        code: '500',
        message: 'Уже чиним...',
    }));

body
    .querySelector('.error__back-link')
    .insertAdjacentHTML('afterbegin', link.tmpl({
        href: './messenger.html',
        title: 'Назад к чатам',
    }));
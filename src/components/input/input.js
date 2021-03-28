import Handlebars from 'handlebars';

const fs = require('fs');
import './input.scss';

const textFieldTmpl = fs.readFileSync('./src/components/input/input.hbs', 'utf8');
const tmpl = Handlebars.compile(textFieldTmpl);

function handlerFocus() {
    addClassActive(this, 'previous');
}

function handlerBlur(e) {
    if (e.target.value.length === 0) {
        removeClassActive(this, 'previous');
    }
}

function handlerBlurMail(e) {
    if (e.target.value.length > 0) {
        if (!e.target.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i)) {
            addClassActive(this, 'next');
        } else {
            removeClassActive(this, 'next');
        }
    }
}

function handlerInput(e) {
    if (e.target.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i)) {
        removeClassActive(this, 'next');
    }
}

function handlerCheckEmpty(e) {
    if (e.target.value.length === 0) {
        addClassActive(this, 'next');
        return;
    }
    removeClassActive(this, 'next');
}

function handlerCheckLength(e) {
    if (e.target.value.length < 6) {
        addClassActive(this, 'next');
        return;
    }
    removeClassActive(this, 'next');
}

function handlerConfirmPassword(e) {
    const passwordField = document.querySelector('#password');
    if (passwordField.value !== e.target.value) {
        addClassActive(this, 'next');
        return;
    }
    removeClassActive(this, 'next');
}

function removeClassActive(element, sibling) {
    switch (sibling) {
        case 'previous':
            element
                .previousElementSibling
                .classList
                .remove('active');
            break;
        case 'next':
            element
                .nextElementSibling
                .classList
                .remove('active');
            break;
    }
}

function addClassActive(element, sibling) {
    switch (sibling) {
        case 'previous':
            element
                .previousElementSibling
                .classList
                .add('active');
            break;
        case 'next':
            element
                .nextElementSibling
                .classList
                .add('active');
            break;
    }
}

export default {
    tmpl,
    handlerFocus,
    handlerBlur,
    handlerBlurMail,
    handlerInput,
    handlerCheckEmpty,
    handlerCheckLength,
    handlerConfirmPassword,
};
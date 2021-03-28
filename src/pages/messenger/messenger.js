import '../main.scss';
import app from '../../../src/components/app/app';
import main from '../../../src/components/main/main';
import contacts from '../../../src/components/main/contacts/contacts';
import messenger from '../../../src/components/main/messenger/messenger';
import input from '../../components/input/input';

import '@fortawesome/fontawesome-free/css/all.css';
import imgAlexandr from '../../assets/avatar/alexandr.gif';
import imgOksana from '../../assets/avatar/oksana.jpeg';
import imgIlya from '../../assets/avatar/ilya.png';

let body = document.querySelector('body');

body
    .insertAdjacentHTML('afterbegin', app());

body
    .querySelector('.app')
    .insertAdjacentHTML('afterbegin', main.tmpl({}));

const mainBox = body.querySelector('.main');
mainBox.insertAdjacentHTML('afterbegin', contacts.tmpl({
    contact: [
        {
            name: 'Илья',
            avatar_src: imgIlya,
            last_message: 'Lorem ipsum dolor sit amet.',
            message_info: '3',
            active: false,
        },
        {
            name: 'Оксана',
            avatar_src: imgOksana,
            last_message: 'Lorem ipsum dolor sit amet, consectetur adipisicing...',
            message_info: '',
            active: true,
        },
    ]
}));
mainBox.insertAdjacentHTML('beforeend', messenger.tmpl({
    messages: [
        {
            contact: true,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, soluta!',
            date: '2021-03-27',
            time: '20:41',
        },
        {
            contact: true,
            message: 'Lorem ipsum dolor sit amet, consectetur.',
            date: '2021-03-27',
            time: '20:41',
        },
        {
            contact: false,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos dolorem doloribus eum exercitationem hic ipsum libero quisquam? Distinctio, illum itaque?',
            date: '2021-03-27',
            time: '20:45',
        },
        {
            contact: true,
            message: 'ok))',
            date: '2021-03-27',
            time: '20:46',
        },
    ],
    img_user: imgAlexandr
}));

mainBox
    .querySelector('.tool__find')
    .insertAdjacentHTML('afterbegin', input.tmpl({
        field: [
            {
                id: 'find',
                type: 'text',
                placeholder: 'Поиск',
                label: 'Поиск контакта',
            },
        ],
    }));

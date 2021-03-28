import Handlebars from 'handlebars';
const fs = require('fs');
import './messenger.scss';

const messengerTmpl = fs.readFileSync('./src/components/main/messenger/messenger.hbs', 'utf8');
const tmpl = Handlebars.compile(messengerTmpl);

export default {
    tmpl,
};
import Handlebars from 'handlebars';
const fs = require('fs');
import './contacts.scss';

const contactsTmpl = fs.readFileSync('./src/components/main/contacts/contacts.hbs', 'utf8');
const tmpl = Handlebars.compile(contactsTmpl);

export default {
    tmpl,
};
import Handlebars from 'handlebars';
const fs = require('fs');
import './link.scss';

const linkTmpl = fs.readFileSync('./src/components/link/link.hbs', 'utf8');
const tmpl = Handlebars.compile(linkTmpl);

export default {
    tmpl,
};
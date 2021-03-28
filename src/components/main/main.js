import Handlebars from 'handlebars';
const fs = require('fs');
import './main.scss';

const mainTmpl = fs.readFileSync('./src/components/main/main.hbs', 'utf8');
const tmpl = Handlebars.compile(mainTmpl);

export default {
    tmpl
};
import Handlebars from 'handlebars';
const fs = require('fs');
import './error.scss';

const errorTmpl = fs.readFileSync('./src/components/error/error.hbs', 'utf8');
const tmpl = Handlebars.compile(errorTmpl);

export default {
    tmpl,
};
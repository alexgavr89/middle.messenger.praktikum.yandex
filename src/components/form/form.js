import Handlebars from 'handlebars';
const fs = require('fs');
import './form.scss';

const formTmpl = fs.readFileSync('./src/components/form/form.hbs', 'utf8');
const form = Handlebars.compile(formTmpl);

export default form;
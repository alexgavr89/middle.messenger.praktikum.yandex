import Handlebars from 'handlebars';
const fs = require('fs');
import './app.scss';

const appTmpl = fs.readFileSync('./src/components/app/app.hbs', 'utf8');
const app = Handlebars.compile(appTmpl);

export default app;
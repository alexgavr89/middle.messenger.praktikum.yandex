import Handlebars from 'handlebars';
import Block from '../../modules/block';

const fs = require('fs');

export default class FormLogin extends Block {
    constructor(props) {
        super('div', props);
    }

    compile(): string {
        const tmpl = fs.readFileSync('./src/components/form-login/tmpl.hbs', 'utf8');
        const formBlock = Handlebars.compile(tmpl);

        return formBlock(this.props);
    }

    mounted(): void {
        return;
    }

    update(): void {
        const form = this.element.querySelector('form');
        const {mail, password, button} = this.props;

        form.append(mail.getContent());
        form.append(password.getContent());
        form.append(button.getContent());
    }
}

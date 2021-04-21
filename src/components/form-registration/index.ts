import Handlebars from 'handlebars';
import Block from '../../modules/block';

const fs = require('fs');

export default class FormRegistration extends Block {
    constructor(props) {
        super('div', props);
    }

    compile(): string {
        const tmpl = fs.readFileSync('./src/components/form-login/tmpl.hbs', 'utf8');
        const formRegistration = Handlebars.compile(tmpl);

        return formRegistration(this.props);
    }

    mounted(): void {
        return;
    }

    update(): void {
        const form = this.element.querySelector('form');
        const {
            name,
            lastname,
            mail,
            password,
            button,
            confirmPassword,
        } = this.props;

        form.append(name.getContent());
        form.append(lastname.getContent());
        form.append(mail.getContent());
        form.append(password.getContent());
        form.append(confirmPassword.getContent());
        form.append(button.getContent());
    }
}

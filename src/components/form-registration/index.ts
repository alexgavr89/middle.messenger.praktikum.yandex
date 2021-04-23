import {readFileSync} from 'fs';
import Handlebars from 'handlebars';
import Block from '../../modules/block';

export default class FormRegistration<I, B, E> extends Block {
    constructor(props: { name: I; lastname: I; mail: I; password: I; confirmPassword: I; button: B; stylesWrap?: string[]; events?: E; }) {
        super('div', props);
    }

    compile(): string {
        const tmpl = readFileSync('./src/components/form-login/tmpl.hbs', 'utf8');
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

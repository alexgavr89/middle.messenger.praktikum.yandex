import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import Block from '../../modules/block';

export default class FormLogin<I, B, E> extends Block {
    constructor(props: { mail: I; password: I; button: B; stylesWrap?: string[]; events?: E }) {
        super('div', props);
    }

    compile(): string {
        const tmpl = readFileSync('./src/components/form-login/tmpl.hbs', 'utf8');
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

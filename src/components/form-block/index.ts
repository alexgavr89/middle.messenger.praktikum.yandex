import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import Block from '../../modules/block';

import './style.scss';

export default class FormBlock<F, E, L> extends Block {
    constructor(props: { title: string; form: F; link: L; stylesWrap?: string[]; events?: E}) {
        super('div', props);
    }

    compile(): string {
        const tmpl = readFileSync('./src/components/form-block/tmpl.hbs', 'utf8');
        const formBlock = Handlebars.compile(tmpl);

        return formBlock(this.props);
    }

    mounted(): void {
        return;
    }

    update(): void {
        const {form, link} = this.props;

        this.element.append(form.getContent());
        this.element.append(link.getContent());
    }
}

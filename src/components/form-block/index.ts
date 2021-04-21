import Handlebars from 'handlebars';
import Block from '../../modules/block';

import './style.scss';

const fs = require('fs');

export default class FormBlock extends Block {
    constructor(props) {
        super('div', props);
    }

    compile(): string {
        const tmpl = fs.readFileSync('./src/components/form-block/tmpl.hbs', 'utf8');
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

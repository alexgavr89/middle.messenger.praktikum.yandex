import Handlebars from 'handlebars';
import Block from '../../../modules/block';

const fs = require('fs');

export default class InputError extends Block {
    constructor(props) {
        super('div', props);
    }

    compile(): string {
        const tmpl = fs.readFileSync('./src/components/input-block/input-error/tmpl.hbs', 'utf8');
        const inputError = Handlebars.compile(tmpl);

        return inputError(this.props);
    }

    mounted(): void {
        this.hide();
    }

    update(): void {
        return;
    }
}

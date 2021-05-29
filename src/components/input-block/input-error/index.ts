import {readFileSync} from 'fs';
import Handlebars from 'handlebars';
import Block from '../../../modules/block';

export default class InputError extends Block {
    constructor(props: { error: string; }) {
        super('div', props);
    }

    compile(): string {
        const tmpl = readFileSync('./src/components/input-block/input-error/tmpl.hbs', 'utf8');
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

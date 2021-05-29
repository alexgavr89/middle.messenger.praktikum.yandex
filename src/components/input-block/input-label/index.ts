import {readFileSync} from 'fs';
import Handlebars from 'handlebars';
import Block from '../../../modules/block';

export default class InputLabel extends Block {
    constructor(props: { id: string; label: string; }) {
        super('div', props);
    }

    compile(): string {
        const tmpl = readFileSync('./src/components/input-block/input-label/tmpl.hbs', 'utf8');
        const input = Handlebars.compile(tmpl);

        return input(this.props);
    }

    mounted(): void {
        this.hide();
    }

    update(): void {
        return;
    }
}

import Handlebars from 'handlebars';
import Block from '../../../modules/block';

const fs = require('fs');

export default class InputLabel extends Block {
    constructor(props) {
        super('div', props);
    }

    compile(): string {
        const tmpl = fs.readFileSync('./src/components/input-block/input-label/tmpl.hbs', 'utf8');
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

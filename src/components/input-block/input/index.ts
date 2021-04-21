import Handlebars from 'handlebars';
import Block from '../../../modules/block';

const fs = require('fs');

import './stype.scss';

export default class Input extends Block {
    constructor(props) {
        super('div', props);
    }

    compile(): string {
        const tmpl = fs.readFileSync('./src/components/input-block/input/tmpl.hbs', 'utf8');
        const input = Handlebars.compile(tmpl);

        return input(this.props);
    }

    mounted(): void {
        return;
    }

    update(): void {
        return;
    }
}

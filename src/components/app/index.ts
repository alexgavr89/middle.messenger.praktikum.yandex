import { Block, Props } from '../../modules/block';

import './style.scss';

interface IAppProps extends Props {
  app: unknown;
}

export default class App extends Block {
  constructor(props: IAppProps) {
    super('div', props);
  }

  protected update(): void {
    this.element.appendChild(this.props.app.getContent());
  }
}

import { Block, Props } from '../../modules/block';

import '../style.scss';

interface NotFoundPageProps extends Props {
  [key: string]: unknown;
}

export default class NotFound extends Block {
  private static instance: NotFound;

  constructor(props: Props) {
    super('div', props);
  }

  public static getInstance(props?: NotFoundPageProps): NotFound {
    if (!NotFound.instance) {
      NotFound.instance = new NotFound(props);
    }

    return NotFound.instance;
  }

  update(): void {
    this.element.append('404');
  }
}

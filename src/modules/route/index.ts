import render from '../../utils/render';
import { Block } from '../block';

export interface Props {
  rootQuery: string;
}

export class Route {
  private block: Block | null;

  constructor(private pathname: string, private ViewClass: any, private props: Props) {
    this.block = null;
  }

  navigate(pathname: string): void {
    if (this.block && this.match(pathname)) {
      this.block.visibility('visible');
    }
  }

  leave(): void {
    if (this.block) {
      this.block.remove();
    }
  }

  match(pathname: string): boolean {
    return pathname === this.pathname;
  }

  render(): void {
    if (!this.block) {
      this.block = new this.ViewClass();
    }

    if (this.block) {
      render(this.props.rootQuery, this.block);
    }
  }
}

import { Block } from '../../modules/block';

export default function render(query: string, block: Block): void {
  const root = document.querySelector(query);

  root.insertBefore(block.getContent(), document.querySelector('script'));
}

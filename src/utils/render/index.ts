import { Block } from '../../modules/block';

function render(query: string, block: Block): Element | never {
  const root = document.querySelector(query);

  if (root) {
    root.appendChild(block.getContent());
    return root;
  }

  throw new Error(`${query} не найден`);
}

export default render;

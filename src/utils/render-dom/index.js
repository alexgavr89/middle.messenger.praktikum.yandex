export function render(query, block) {
    const root = document.querySelector(query);

    root.insertBefore(block.getContent(), document.querySelector('script'));
    return root;
}

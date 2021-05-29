export function render<T>(query: string, block: T): void {
    const root = document.querySelector(query);

    root.insertBefore(block.getContent(), document.querySelector('script'));
}

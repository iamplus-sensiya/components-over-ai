export declare class OAILazyContent {
    el: HTMLElement;
    observer: IntersectionObserver;
    readonly template: HTMLTemplateElement | undefined;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private disconnectObserver;
    handleIntersect(entries: IntersectionObserverEntry[]): void;
    render(): any;
}

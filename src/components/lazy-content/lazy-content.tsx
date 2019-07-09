import { Component, h, Element } from '@stencil/core';

@Component({
    tag: 'oai-lazy-content',
    shadow: true
})
export class OAILazyContent {
    @Element()
    el!: HTMLElement;

    observer!: IntersectionObserver;

    get template() {
        return Array.from(this.el.children)
            .find(c => c.matches('template')) as HTMLTemplateElement | undefined;
    }

    connectedCallback() {

        if (this.template && this.template.content) {

            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 1.0
            };

            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), options);
            this.observer.observe(this.el);
        }

    }

    disconnectedCallback() {
        this.disconnectObserver();
    }

    private disconnectObserver() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    handleIntersect(entries: IntersectionObserverEntry[]) {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
                if (this.template) {
                    const node = document.adoptNode(this.template.content);
                    this.el.appendChild(node);
                    this.template.remove();
                    this.disconnectObserver();
                }
            }
        });

    }

    render() {
        return (
            <slot />
        );
    }
}
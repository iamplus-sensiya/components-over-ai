import { Component, Host, h, Element, Prop } from '@stencil/core';
import { OAIDrawersStack } from './drawer-stack';


@Component({
    tag: 'oai-drawer',
    styleUrl: './drawer.scss',
    shadow: true
})
export class OAIDrawer {
    @Element()
    el!: HTMLElement;

    @Prop() stack!: OAIDrawersStack;
    @Prop() inlineSize: string = '50%';

    observer: IntersectionObserver | undefined;

    get template() {
        return Array.from(this.el.children)
            .find(c => c.matches('template')) as HTMLTemplateElement | undefined;
    }

    connectedCallback() {

        if (this.template) {

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
                    this.el.append(this.template.content);
                    this.template.remove();
                    this.disconnectObserver();
                }
            }
        });

    }

    pop() {
        (this.el as any).parentElement.pop();
    }

    render() {
        // console.log('render drawer. offset is', this.offset)
        return <Host style={{ inlineSize: this.inlineSize }}>
            {/* <oai-button onClick={this.pop.bind(this)}>Ｘ</oai-button> */}
            <slot />
        </Host>
    }
}
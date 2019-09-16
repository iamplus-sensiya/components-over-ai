import { Component, h, Element, Host, Prop } from '@stencil/core';
import { Color } from '../../interface';
import { createColorClasses } from '../../utils/theme';
const SELECTED = 'selected';

@Component({
    tag: 'oai-tabs',
    styleUrl: 'tabs.scss',
    shadow: true
})
export class OAITabs {
    @Prop() color?: Color;
    @Element() el!: HTMLElement;

    connectedCallback() {
        this.el.querySelector(SELECTED) ||
            this.el.firstElementChild instanceof HTMLElement &&
            this.el.firstElementChild.setAttribute(SELECTED, 'true');

    }

    render() {
        return <Host
            class={{
                ...createColorClasses(this.color)
            }}
        >
            <slot />
        </Host>;
    }
}

import { Component, h, Element } from '@stencil/core';
const SELECTED = 'selected';

@Component({
    tag: 'oai-tabs',
    styleUrl: 'tabs.scss',
    shadow: true
})
export class OAITabs {
    @Element() el!: HTMLElement;

    connectedCallback() {
        this.el.querySelector(SELECTED) ||
            this.el.firstElementChild instanceof HTMLElement &&
            this.el.firstElementChild.setAttribute(SELECTED, 'true');

        console.log(this.el.firstElementChild)
    }

    render() {
        return (<slot />);
    }
}

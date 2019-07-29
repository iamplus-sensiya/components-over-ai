import { Component, h, Prop, Element, Listen } from '@stencil/core';
const SELECTED = 'selected';

@Component({
    tag: 'oai-tab',
    styleUrl: 'tab.scss',
    shadow: true
})
export class OAITab {
    @Element() el!: HTMLElement;
    @Prop({ mutable: true }) disableRipple = false;

    @Listen('click', { capture: true })
    handleClick(e: MouseEvent | TouchEvent) {
        const { target } = e;
        if (target instanceof HTMLElement) {
            const { parentElement } = target;
            console.log(parentElement)
            const selected = parentElement && parentElement.querySelectorAll(`[${SELECTED}="true"]`);
            selected && selected.forEach(sl => sl.removeAttribute(SELECTED));
            target.setAttribute(SELECTED, 'true');
        }
    }

    render() {
        return ([
            <div>
                <slot />
                {this.disableRipple
                    ? null
                    : <oai-ripple el={this.el} />}
            </div>
        ]);
    }
}

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

    @Prop() drawerStack!: OAIDrawersStack;
    @Prop() inlineSize: string = '50%';

    pop() {
        (this.el as any).parentElement.pop();
    }

    render() {
        return <Host style={{ inlineSize: this.inlineSize }}>
            {/* <oai-button onClick={this.pop.bind(this)}>Ｘ</oai-button> */}
            <slot />
        </Host>
    }
}
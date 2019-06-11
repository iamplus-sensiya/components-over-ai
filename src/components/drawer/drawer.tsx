import { Component, Host, h, Prop } from '@stencil/core';
import { OAIDrawersStack } from './drawer-stack';

@Component({
    tag: 'oai-drawer',
    styleUrl: './drawer.scss',
    shadow: true
})
export class OAIDrawer {
    // @Prop() open = false;
    // @Prop() index: number | undefined;
    // @Prop() offset: string | undefined;
    @Prop() stack!: OAIDrawersStack;
    @Prop() width: string = '70%';

    pop() {
        this.stack.pop();
    }

    render() {
        // console.log('render drawer. offset is', this.offset)
        return <Host style={{ width: this.width }}>
            <oai-button onClick={this.pop.bind(this)}>Ｘ</oai-button>
            <slot />
        </Host>
    }
}
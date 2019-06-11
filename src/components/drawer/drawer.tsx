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
        console.log(9, this.stack);
        this.stack.pop();
    }

    render() {
        // console.log('render drawer. offset is', this.offset)
        return <Host style={{ width: this.width }}>
            <oai-button onClick={this.pop.bind(this)}>Ｘ</oai-button>
            <h1>Hello world</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa voluptates deleniti, sunt enim, accusamus eveniet dolor nobis consectetur nesciunt aperiam dolore architecto. Itaque repudiandae quo quasi alias eum sed consequuntur!</p>
        </Host>
    }
}
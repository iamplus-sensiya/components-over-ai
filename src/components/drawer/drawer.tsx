import { Component, Host, h, Prop } from '@stencil/core';

@Component({
    tag: 'oai-drawer',
    styleUrl: './drawer.scss',
    shadow: true
})
export class OAIDrawer {

    // @Prop() open = false;
    // @Prop() index: number | undefined;
    @Prop() offset: string | undefined;
    @Prop() width: string = '70%';

    render() {
        return (
            <Host style={{ width: this.width, right: this.offset || '0' }}>
                <h1>Hello world</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa voluptates deleniti, sunt enim, accusamus eveniet dolor nobis consectetur nesciunt aperiam dolore architecto. Itaque repudiandae quo quasi alias eum sed consequuntur!</p>
            </Host>
        )
    }
}
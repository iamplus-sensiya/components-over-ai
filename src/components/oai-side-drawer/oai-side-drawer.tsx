import { Component } from '@stencil/core';

@Component({
    tag: 'oai-side-drawer',
    styleUrl: './oai-side-drawer.scss',
    shadow: true
})
export class OAISideDrawer {
    /**
   * The first name
   */
    // @Prop({reflectToAttr:true}) width = 250;

    render() {
        return (
            <div>
                <h1>the side drawer</h1>
                <slot />
            </div>
        )
    }
}
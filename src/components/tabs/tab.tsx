import { Component, h, Prop, Element } from '@stencil/core';

@Component({
    tag: 'oai-tab',
    styleUrl: './tab.scss',
    shadow: true
})
export class OAITab {
    @Element() el!: HTMLElement;
    @Prop({ mutable: true }) disableRipple = false;

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

import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'oai-button',
    styleUrl: './button.scss',
    shadow: true
})
export class OAIButton {
    /**
    * The minimum size
    */
    // @Prop({ reflectToAttr: true }) minSize: string;
    @Prop({ reflectToAttr: true }) state: 'default' | 'disabled' | 'pending';

    render() {
        let pendingIndicator = null;
        if (this.state === 'pending') {
            pendingIndicator = 'loading...';
        }
        return (
            <button disabled={this.state === 'disabled' || this.state === 'pending'}>
                {pendingIndicator}
                <slot />
            </button>
        )
    }
}
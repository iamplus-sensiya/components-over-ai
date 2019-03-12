import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'oai-button',
    styleUrl: './button.scss',
    shadow: true
})
export class OAIButton {

    /** (optional) The minimum size of the button (xs / sm / lg / xl) */
    /** (optional) The style of the button (default = filled / outlined (stroked)) */
    /** (optional) The theme of the button (default = pale / primary / accent / warn) */

    /**
     * @Prop --oai-color-pale: pale theme main color;
     * @Prop --oai-color-pale-contrast: pale theme contrast color;
     * @Prop --oai-color-primary: primary theme main color;
     * @Prop --oai-color-primary-contrast: primary theme contrast color;
     * @Prop --oai-color-secondary: secondary theme main color;
     * @Prop --oai-color-secondary-contrast: secondary theme contrast color;
     * @Prop --oai-color-warn: warn theme main color;
     * @Prop --oai-color-warn-contrast: warn theme contrast color;
    */

    /** (optional) The state of the button (default / disabled / pending) */
    @Prop({ reflectToAttr: true }) state: 'default' | 'disabled' | 'pending' = 'default';

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
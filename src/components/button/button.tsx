import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'oai-button',
    styleUrl: './button.scss',
    shadow: true
})
export class OAIButton {

    /** (optional) The minimum size of the button (xs / sm / lg / xl) */
    /** (optional) The style of the button (default = filled / outlined (stroked)) */

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
    @Prop({ reflectToAttr: true }) color: 'pale' | 'primary' | 'accent' | 'warn' = 'pale';

    render() {

        let pendingIndicator = this.state === 'pending' ?
            <oai-progress-indicator class="pending-indicator" color={this.color} /> : null;

        return (
            <button disabled={this.state === 'disabled' || this.state === 'pending'}>
                {pendingIndicator}
                <slot name="prefix" />
                <slot />
                <slot name="suffix" />
            </button>
        )

    }
}
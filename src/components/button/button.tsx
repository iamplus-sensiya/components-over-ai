import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'oai-button',
    styleUrl: './button.scss',
    shadow: true
})
export class OAIButton {

    /** (optional) The minimum size of the button (xs / sm / lg / xl) */
    /** (optional) The type of the button (default = filled / outlined (stroked)) */

    /** (optional) The state of the button (default / disabled / pending) */
    @Prop({ reflectToAttr: true }) state: 'default' | 'disabled' | 'pending' = 'default';
    @Prop({ reflectToAttr: true }) color: 'pale' | 'primary' | 'accent' | 'error' | 'warn' = 'pale';

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
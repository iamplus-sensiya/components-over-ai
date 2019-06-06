import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'oai-progress-indicator',
    styleUrl: './progress-indicator.scss',
    shadow: true
})
export class OAIProgressIndicator {
    /** (optional) The size of the progress indicator (xs (default) / sm / lg / xl) */

    @Prop({ reflectToAttr: true }) size: 'xs' | 'sm' | 'lg' | 'xl' = 'xs';
    @Prop({ reflectToAttr: true }) color: 'pale' | 'primary' | 'accent' | 'error' | 'warn' = 'pale';

    render() {
        return (
            <svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        )
    }
}
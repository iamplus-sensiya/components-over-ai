import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'oai-progress-indicator',
    styleUrl: './progress-indicator.scss',
    shadow: true
})
export class OAIProgressIndicator {
    /** (optional) The size of the progress indicator (xs (default) / sm / lg / xl) */

    @Prop({ reflectToAttr: true }) size: 'xs' | 'sm' | 'lg' | 'xl' = 'xs';

    render() {
        return (
            <div class="loader"></div>
        )
    }
}
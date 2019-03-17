import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'oai-progress-indicator',
    styleUrl: './progress-indicator.scss',
    shadow: true
})
export class OAIProgressIndicator {
    /** (optional) The size of the progress indicator (xs (default) / sm / lg / xl) */

    @Prop({ reflectToAttr: true }) size: 'xs' | 'sm' | 'lg' | 'xl' = 'xs';
    @Prop({ reflectToAttr: true }) color: 'pale' | 'primary' | 'accent' | 'warn' = 'pale';

    render() {
        return (
            [<div class="lds-ripple"><div></div><div></div></div>]
            // <div class="loader"></div>
        )
    }
}
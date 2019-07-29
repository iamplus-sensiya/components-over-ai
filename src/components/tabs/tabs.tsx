import { Component, h } from '@stencil/core';

@Component({
    tag: 'oai-tabs',
    styleUrl: 'tabs.scss',
    shadow: true
})
export class OAITabs {

    render() {
        return (
            <nav>
                <slot />
            </nav>
        );
    }
}

import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'oai-select-bind',
    shadow: true
})
export class OAISelect {
    @Prop() name!: string;

    render() {
        return (
            <mark>
                <slot />
            </mark>
        );
    }
}
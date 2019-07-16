import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'oai-select-bind',
    styleUrl: 'select-bind.scss',
    // shadow: true
})
export class OAISelectBind {
    @Prop() name!: string;

    render() {
        return (
            <mark>
                <slot />
            </mark>
        );
    }
}
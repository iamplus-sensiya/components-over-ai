import { Component, Prop, h, Host } from '@stencil/core';
import { Color } from '../../interface';
import { createColorClasses } from '../../utils/theme';

@Component({
    tag: 'oai-toolbar',
    styleUrl: './toolbar.scss',
    shadow: true
})
export class OAIToolbar {

    /**
     * The color to use from your application's color palette.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     * For more information on colors, see [theming](/docs/theming/basics).
     */
    @Prop() color?: Color;

    render() {
        return (
            <Host class={{ ...createColorClasses(this.color), }}>
                <div class="toolbar-background"></div>
                <div class="toolbar-container">
                    <slot name="start"></slot>
                    <slot name="secondary"></slot>
                    <div class="toolbar-content">
                        <slot></slot>
                    </div>
                    <slot name="primary"></slot>
                    <slot name="end"></slot>
                </div>
            </Host>
        );
    }
}
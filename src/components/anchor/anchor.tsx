import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'oai-anchor',
    styleUrl: './anchor.scss',
    shadow: true
})
export class OAIAnchor {

    /** (optional) The minimum size of the button (xs / sm / lg / xl) */
    /** (optional) The type of the button (default = filled / outlined (stroked)) */

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

    @Prop({ reflectToAttr: true }) color: 'pale' | 'primary' | 'accent' | 'error' | 'warn' = 'pale';

    render() {

        return (
            <a>
                <slot name="prefix" />
                <slot />
                <slot name="suffix" />
            </a>
        )

    }
}
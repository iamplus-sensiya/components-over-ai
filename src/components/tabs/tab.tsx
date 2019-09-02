import { Component, h, Prop, Element, Listen } from '@stencil/core';
import { OAIButton } from '../button/button';
const SELECTED = 'selected';

@Component({
    tag: 'oai-tab',
    styleUrl: 'tab.scss',
    shadow: true,
})
export class OAITab {
    @Element() el!: HTMLElement;
    @Prop({ mutable: true }) disableRipple = false;

    /** (optional) The state of the button (disabled / pending / undefined = default) */
    @Prop({ reflectToAttr: true }) state?: 'disabled' | 'pending';

    /**
     * This attribute instructs browsers to download a URL instead of navigating to
     * it, so the user will be prompted to save it as a local file. If the attribute
     * has a value, it is used as the pre-filled file name in the Save prompt
     * (the user can still change the file name if they want).
     */
    @Prop() download: string | undefined;

    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    @Prop() href: string | undefined;

    /**
     * Specifies the relationship of the target object to the link object.
     * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
     */
    @Prop() rel: string | undefined;

    /**
     * Specifies where to display the linked URL.
     * Only applies when an `href` is provided.
     * Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
     */
    @Prop() target: string | undefined;

    @Listen('click', { capture: true })
    handleClick(e: MouseEvent | TouchEvent) {
        const { target } = e;
        if (target instanceof HTMLElement) {
            const { parentElement } = target;
            console.log(parentElement)
            const selected = parentElement && parentElement.querySelectorAll(`[${SELECTED}="true"]`);
            selected && selected.forEach(sl => sl.removeAttribute(SELECTED));
            target.setAttribute(SELECTED, 'true');
        }
    }

    render() {
        const { href, rel, target } = this;
        const TagType = href === undefined ? 'button' : 'a' as any;
        const attrs = (TagType === 'button')
            ? {}
            : {
                download: this.download,
                href,
                rel,
                target
            };

        return (
            <TagType {...attrs} disabled={this.state === 'disabled' || this.state === 'pending'}>

                <slot />
                {
                    this.disableRipple
                        ? null
                        : <oai-ripple el={this.el} />
                }
            </TagType>
        );
    }
}

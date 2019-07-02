import { Component, h, Prop, Element } from '@stencil/core';
import { Color } from '../../interface';


@Component({
    tag: 'oai-button',
    styleUrl: './button.scss',
    shadow: true
})
export class OAIButton {
    @Element() el!: HTMLElement;

    /** (optional) The minimum size of the button (xs / sm / lg / xl) */
    /** (optional) The type of the button (default = filled / outlined (stroked)) */

    /** (optional) The state of the button (disabled / pending / undefined = default) */
    @Prop({ reflectToAttr: true }) state?: 'disabled' | 'pending';
    /** (optional) The color of the button (pale / primary (default) / accent / error / warn) */
    @Prop({ reflectToAttr: true }) color?: Color;

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

    // adds ripple effect
    // @Listen('click', { capture: true })
    handleClick(ev: MouseEvent | TouchEvent) {
        const event = 'touches' in ev ? ev.touches.item(0) : ev;
        if (event) {
            const r = this.el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
            this.el.style.cssText = `--s: 0; --o: 1;`; this.el.offsetTop;
            this.el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${event.clientX - r.left}; --y:${event.clientY - r.top};`
        }
    }

    connectedCallback() {
        this.el.setAttribute('role', 'button');
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

        let pendingIndicator = this.state === 'pending' ?
            <oai-progress-indicator class="pending-indicator" color={this.color} /> : null;

        return (
            <TagType {...attrs} disabled={this.state === 'disabled' || this.state === 'pending'}
                onClick={TagType === 'button' ? this.handleClick.bind(this) : null}>
                {pendingIndicator}
                <slot name="prefix" />
                <slot />
                <slot name="suffix" />
            </TagType>
        )

    }
}
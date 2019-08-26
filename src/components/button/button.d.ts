import { Color } from '../../interface';
export declare class OAIButton {
    el: HTMLElement;
    disableRipple: boolean;
    /** (optional) The minimum size of the button (xs / sm / lg / xl) */
    /** (optional) The type of the button (default = filled / outlined (stroked)) */
    /** (optional) The state of the button (disabled / pending / undefined = default) */
    state?: 'disabled' | 'pending';
    /** (optional) The color of the button (pale / primary (default) / accent / error / warn) */
    color?: Color;
    /**
     * This attribute instructs browsers to download a URL instead of navigating to
     * it, so the user will be prompted to save it as a local file. If the attribute
     * has a value, it is used as the pre-filled file name in the Save prompt
     * (the user can still change the file name if they want).
     */
    download: string | undefined;
    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    href: string | undefined;
    /**
     * Specifies the relationship of the target object to the link object.
     * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
     */
    rel: string | undefined;
    /**
     * Specifies where to display the linked URL.
     * Only applies when an `href` is provided.
     * Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
     */
    target: string | undefined;
    connectedCallback(): void;
    render(): any;
}

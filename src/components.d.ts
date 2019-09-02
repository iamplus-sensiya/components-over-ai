/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  Color,
} from './interface';
import {
  OAIDrawersStack,
} from './components/drawer/drawer-stack';
import {
  Segment,
} from './components/segments/segment.model';

export namespace Components {
  interface OaiApplicationLayout {}
  interface OaiButton {
    /**
    * (optional) The color of the button (pale / primary (default) / accent / error / warn)
    */
    'color'?: Color;
    'disableRipple': boolean;
    /**
    * This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want).
    */
    'download': string | undefined;
    /**
    * Contains a URL or a URL fragment that the hyperlink points to. If this property is set, an anchor tag will be rendered.
    */
    'href': string | undefined;
    /**
    * Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
    */
    'rel': string | undefined;
    /**
    * (optional) The minimum size of the button (xs / sm / lg / xl) (optional) The shape of the button (default = clear / fill / outline (stroked)) (optional) The state of the button (disabled / pending / undefined = default)
    */
    'state'?: 'disabled' | 'pending';
    /**
    * Specifies where to display the linked URL. Only applies when an `href` is provided. Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
    */
    'target': string | undefined;
  }
  interface OaiDrawer {
    'drawerStack': OAIDrawersStack;
    'inlineSize': string;
  }
  interface OaiDrawerStack {
    'pop': (payload?: any) => Promise<void>;
  }
  interface OaiInclude {
    'src': string;
  }
  interface OaiLazyContent {}
  interface OaiProgressIndicator {
    'color'?: Color;
    /**
    * (optional) The size of the progress indicator (xs (default) / sm / lg / xl)
    */
    'size': 'xs' | 'sm' | 'lg' | 'xl';
  }
  interface OaiResizer {
    'color': string;
    'value': string;
  }
  interface OaiRipple {
    'el': HTMLElement;
  }
  interface OaiSegments {
    /**
    * (optional) auto expand selection (default = false)
    */
    'autoExpand': boolean;
    'segments': Segment[];
  }
  interface OaiTab {
    'disableRipple': boolean;
  }
  interface OaiTabs {
    'color'?: Color;
  }
  interface OaiToolbar {
    /**
    * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"success"`, `"error"`, `"warn"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
    */
    'color'?: Color;
  }
}

declare global {


  interface HTMLOaiApplicationLayoutElement extends Components.OaiApplicationLayout, HTMLStencilElement {}
  var HTMLOaiApplicationLayoutElement: {
    prototype: HTMLOaiApplicationLayoutElement;
    new (): HTMLOaiApplicationLayoutElement;
  };

  interface HTMLOaiButtonElement extends Components.OaiButton, HTMLStencilElement {}
  var HTMLOaiButtonElement: {
    prototype: HTMLOaiButtonElement;
    new (): HTMLOaiButtonElement;
  };

  interface HTMLOaiDrawerElement extends Components.OaiDrawer, HTMLStencilElement {}
  var HTMLOaiDrawerElement: {
    prototype: HTMLOaiDrawerElement;
    new (): HTMLOaiDrawerElement;
  };

  interface HTMLOaiDrawerStackElement extends Components.OaiDrawerStack, HTMLStencilElement {}
  var HTMLOaiDrawerStackElement: {
    prototype: HTMLOaiDrawerStackElement;
    new (): HTMLOaiDrawerStackElement;
  };

  interface HTMLOaiIncludeElement extends Components.OaiInclude, HTMLStencilElement {}
  var HTMLOaiIncludeElement: {
    prototype: HTMLOaiIncludeElement;
    new (): HTMLOaiIncludeElement;
  };

  interface HTMLOaiLazyContentElement extends Components.OaiLazyContent, HTMLStencilElement {}
  var HTMLOaiLazyContentElement: {
    prototype: HTMLOaiLazyContentElement;
    new (): HTMLOaiLazyContentElement;
  };

  interface HTMLOaiProgressIndicatorElement extends Components.OaiProgressIndicator, HTMLStencilElement {}
  var HTMLOaiProgressIndicatorElement: {
    prototype: HTMLOaiProgressIndicatorElement;
    new (): HTMLOaiProgressIndicatorElement;
  };

  interface HTMLOaiResizerElement extends Components.OaiResizer, HTMLStencilElement {}
  var HTMLOaiResizerElement: {
    prototype: HTMLOaiResizerElement;
    new (): HTMLOaiResizerElement;
  };

  interface HTMLOaiRippleElement extends Components.OaiRipple, HTMLStencilElement {}
  var HTMLOaiRippleElement: {
    prototype: HTMLOaiRippleElement;
    new (): HTMLOaiRippleElement;
  };

  interface HTMLOaiSegmentsElement extends Components.OaiSegments, HTMLStencilElement {}
  var HTMLOaiSegmentsElement: {
    prototype: HTMLOaiSegmentsElement;
    new (): HTMLOaiSegmentsElement;
  };

  interface HTMLOaiTabElement extends Components.OaiTab, HTMLStencilElement {}
  var HTMLOaiTabElement: {
    prototype: HTMLOaiTabElement;
    new (): HTMLOaiTabElement;
  };

  interface HTMLOaiTabsElement extends Components.OaiTabs, HTMLStencilElement {}
  var HTMLOaiTabsElement: {
    prototype: HTMLOaiTabsElement;
    new (): HTMLOaiTabsElement;
  };

  interface HTMLOaiToolbarElement extends Components.OaiToolbar, HTMLStencilElement {}
  var HTMLOaiToolbarElement: {
    prototype: HTMLOaiToolbarElement;
    new (): HTMLOaiToolbarElement;
  };
  interface HTMLElementTagNameMap {
    'oai-application-layout': HTMLOaiApplicationLayoutElement;
    'oai-button': HTMLOaiButtonElement;
    'oai-drawer': HTMLOaiDrawerElement;
    'oai-drawer-stack': HTMLOaiDrawerStackElement;
    'oai-include': HTMLOaiIncludeElement;
    'oai-lazy-content': HTMLOaiLazyContentElement;
    'oai-progress-indicator': HTMLOaiProgressIndicatorElement;
    'oai-resizer': HTMLOaiResizerElement;
    'oai-ripple': HTMLOaiRippleElement;
    'oai-segments': HTMLOaiSegmentsElement;
    'oai-tab': HTMLOaiTabElement;
    'oai-tabs': HTMLOaiTabsElement;
    'oai-toolbar': HTMLOaiToolbarElement;
  }
}

declare namespace LocalJSX {
  interface OaiApplicationLayout extends JSXBase.HTMLAttributes<HTMLOaiApplicationLayoutElement> {}
  interface OaiButton extends JSXBase.HTMLAttributes<HTMLOaiButtonElement> {
    /**
    * (optional) The color of the button (pale / primary (default) / accent / error / warn)
    */
    'color'?: Color;
    'disableRipple'?: boolean;
    /**
    * This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want).
    */
    'download'?: string | undefined;
    /**
    * Contains a URL or a URL fragment that the hyperlink points to. If this property is set, an anchor tag will be rendered.
    */
    'href'?: string | undefined;
    /**
    * Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
    */
    'rel'?: string | undefined;
    /**
    * (optional) The minimum size of the button (xs / sm / lg / xl) (optional) The shape of the button (default = clear / fill / outline (stroked)) (optional) The state of the button (disabled / pending / undefined = default)
    */
    'state'?: 'disabled' | 'pending';
    /**
    * Specifies where to display the linked URL. Only applies when an `href` is provided. Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
    */
    'target'?: string | undefined;
  }
  interface OaiDrawer extends JSXBase.HTMLAttributes<HTMLOaiDrawerElement> {
    'drawerStack': OAIDrawersStack;
    'inlineSize'?: string;
  }
  interface OaiDrawerStack extends JSXBase.HTMLAttributes<HTMLOaiDrawerStackElement> {
    'onDrawerPopped'?: (event: CustomEvent<any>) => void;
  }
  interface OaiInclude extends JSXBase.HTMLAttributes<HTMLOaiIncludeElement> {
    'src': string;
  }
  interface OaiLazyContent extends JSXBase.HTMLAttributes<HTMLOaiLazyContentElement> {}
  interface OaiProgressIndicator extends JSXBase.HTMLAttributes<HTMLOaiProgressIndicatorElement> {
    'color'?: Color;
    /**
    * (optional) The size of the progress indicator (xs (default) / sm / lg / xl)
    */
    'size'?: 'xs' | 'sm' | 'lg' | 'xl';
  }
  interface OaiResizer extends JSXBase.HTMLAttributes<HTMLOaiResizerElement> {
    'color': string;
    'value': string;
  }
  interface OaiRipple extends JSXBase.HTMLAttributes<HTMLOaiRippleElement> {
    'el': HTMLElement;
  }
  interface OaiSegments extends JSXBase.HTMLAttributes<HTMLOaiSegmentsElement> {
    /**
    * (optional) auto expand selection (default = false)
    */
    'autoExpand'?: boolean;
    'onTextSelected'?: (event: CustomEvent<any>) => void;
    'segments'?: Segment[];
  }
  interface OaiTab extends JSXBase.HTMLAttributes<HTMLOaiTabElement> {
    'disableRipple'?: boolean;
  }
  interface OaiTabs extends JSXBase.HTMLAttributes<HTMLOaiTabsElement> {
    'color'?: Color;
  }
  interface OaiToolbar extends JSXBase.HTMLAttributes<HTMLOaiToolbarElement> {
    /**
    * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"success"`, `"error"`, `"warn"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
    */
    'color'?: Color;
  }

  interface IntrinsicElements {
    'oai-application-layout': OaiApplicationLayout;
    'oai-button': OaiButton;
    'oai-drawer': OaiDrawer;
    'oai-drawer-stack': OaiDrawerStack;
    'oai-include': OaiInclude;
    'oai-lazy-content': OaiLazyContent;
    'oai-progress-indicator': OaiProgressIndicator;
    'oai-resizer': OaiResizer;
    'oai-ripple': OaiRipple;
    'oai-segments': OaiSegments;
    'oai-tab': OaiTab;
    'oai-tabs': OaiTabs;
    'oai-toolbar': OaiToolbar;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}



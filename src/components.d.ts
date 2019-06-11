/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface OaiButton {
    'color': 'pale' | 'primary' | 'accent' | 'error' | 'warn';
    /**
    * (optional) The minimum size of the button (xs / sm / lg / xl) (optional) The type of the button (default = filled / outlined (stroked)) (optional) The state of the button (default / disabled / pending)
    */
    'state': 'default' | 'disabled' | 'pending';
  }
  interface OaiDrawer {
    'width': string;
  }
  interface OaiDrawerStack {
    'pop': () => Promise<void>;
    'push': (tmpl: HTMLTemplateElement, config: { width: string; }) => Promise<void>;
  }
  interface OaiProgressIndicator {
    'color': 'pale' | 'primary' | 'accent' | 'error' | 'warn';
    /**
    * (optional) The size of the progress indicator (xs (default) / sm / lg / xl)
    */
    'size': 'xs' | 'sm' | 'lg' | 'xl';
  }
}

declare global {


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

  interface HTMLOaiProgressIndicatorElement extends Components.OaiProgressIndicator, HTMLStencilElement {}
  var HTMLOaiProgressIndicatorElement: {
    prototype: HTMLOaiProgressIndicatorElement;
    new (): HTMLOaiProgressIndicatorElement;
  };
  interface HTMLElementTagNameMap {
    'oai-button': HTMLOaiButtonElement;
    'oai-drawer': HTMLOaiDrawerElement;
    'oai-drawer-stack': HTMLOaiDrawerStackElement;
    'oai-progress-indicator': HTMLOaiProgressIndicatorElement;
  }
}

declare namespace LocalJSX {
  interface OaiButton extends JSXBase.HTMLAttributes<HTMLOaiButtonElement> {
    'color'?: 'pale' | 'primary' | 'accent' | 'error' | 'warn';
    /**
    * (optional) The minimum size of the button (xs / sm / lg / xl) (optional) The type of the button (default = filled / outlined (stroked)) (optional) The state of the button (default / disabled / pending)
    */
    'state'?: 'default' | 'disabled' | 'pending';
  }
  interface OaiDrawer extends JSXBase.HTMLAttributes<HTMLOaiDrawerElement> {
    'width'?: string;
  }
  interface OaiDrawerStack extends JSXBase.HTMLAttributes<HTMLOaiDrawerStackElement> {}
  interface OaiProgressIndicator extends JSXBase.HTMLAttributes<HTMLOaiProgressIndicatorElement> {
    'color'?: 'pale' | 'primary' | 'accent' | 'error' | 'warn';
    /**
    * (optional) The size of the progress indicator (xs (default) / sm / lg / xl)
    */
    'size'?: 'xs' | 'sm' | 'lg' | 'xl';
  }

  interface IntrinsicElements {
    'oai-button': OaiButton;
    'oai-drawer': OaiDrawer;
    'oai-drawer-stack': OaiDrawerStack;
    'oai-progress-indicator': OaiProgressIndicator;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}



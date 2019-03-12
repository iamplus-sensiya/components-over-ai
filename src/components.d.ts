/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface OaiButton {
    /**
    * (optional) The minimum size of the button (xs / sm / lg / xl) (optional) The style of the button (default = filled / outlined (stroked)) (optional) The theme of the button (default = pale / primary / accent / warn) (optional) The state of the button (default / disabled / pending)
    */
    'state': 'default' | 'disabled' | 'pending';
  }
  interface OaiButtonAttributes extends StencilHTMLAttributes {
    /**
    * (optional) The minimum size of the button (xs / sm / lg / xl) (optional) The style of the button (default = filled / outlined (stroked)) (optional) The theme of the button (default = pale / primary / accent / warn) (optional) The state of the button (default / disabled / pending)
    */
    'state'?: 'default' | 'disabled' | 'pending';
  }

  interface OaiSideDrawer {}
  interface OaiSideDrawerAttributes extends StencilHTMLAttributes {}
}

declare global {
  interface StencilElementInterfaces {
    'OaiButton': Components.OaiButton;
    'OaiSideDrawer': Components.OaiSideDrawer;
  }

  interface StencilIntrinsicElements {
    'oai-button': Components.OaiButtonAttributes;
    'oai-side-drawer': Components.OaiSideDrawerAttributes;
  }


  interface HTMLOaiButtonElement extends Components.OaiButton, HTMLStencilElement {}
  var HTMLOaiButtonElement: {
    prototype: HTMLOaiButtonElement;
    new (): HTMLOaiButtonElement;
  };

  interface HTMLOaiSideDrawerElement extends Components.OaiSideDrawer, HTMLStencilElement {}
  var HTMLOaiSideDrawerElement: {
    prototype: HTMLOaiSideDrawerElement;
    new (): HTMLOaiSideDrawerElement;
  };

  interface HTMLElementTagNameMap {
    'oai-button': HTMLOaiButtonElement
    'oai-side-drawer': HTMLOaiSideDrawerElement
  }

  interface ElementTagNameMap {
    'oai-button': HTMLOaiButtonElement;
    'oai-side-drawer': HTMLOaiSideDrawerElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}

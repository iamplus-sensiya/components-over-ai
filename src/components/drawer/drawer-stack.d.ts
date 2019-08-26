import { EventEmitter } from '../../../dist/types/stencil.core';
declare type poppedEventDetails = {
    drawer: string;
    payload?: any;
};
export declare class OAIDrawersStack {
    stack: string[];
    el: HTMLElement;
    handleClickOutside({ target }: Event): void;
    drawerPopped: EventEmitter;
    drawerPoppedHandler(details: poppedEventDetails): void;
    push(name: string): Promise<void>;
    pop(payload?: any): Promise<void>;
    readonly stackDomElements: HTMLOaiDrawerElement[];
    componentDidRender(): void;
    positionDrawers(drawers: HTMLOaiDrawerElement[]): void;
    render(): any[][];
}
export {};

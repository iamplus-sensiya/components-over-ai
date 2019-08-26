import { EventEmitter } from '../../../dist/types/stencil.core';
import { BindingColors } from './color-stack';
export declare class OAISegments {
    el: HTMLElement;
    segments: Segment[];
    /** (optional) auto expand selection (default = false) */
    autoExpand: boolean;
    textSelected: EventEmitter;
    selectHandler(event: CustomEvent): void;
    colors: BindingColors;
    handleMouseup(): void;
    textSelectedHandler(range: Range, selection: Selection): void;
    segmentBindingFnFactory(range: Range, selection: Selection): (value: string) => void;
    update(): void;
    render(): any;
}

import { Component, h, Prop, Element } from '@stencil/core';
import { OAISelect } from './select';

@Component({
    tag: 'oai-select-bind',
    styleUrl: 'select-bind.scss',
    shadow: true
})
export class OAISelectBind {
    // @Prop() segment!: Segment;
    @Prop({ reflectToAttr: true, mutable: true }) value: string | undefined;
    @Prop({ reflectToAttr: true, mutable: true }) index!: number;
    @Element() el!: HTMLElement;
    get select(): OAISelect {
        return (this.el.parentNode as ShadowRoot).host as any;
    }

    constructor() {
        // console.log(this.segment && this.segment.text)
        // this.value = this.segment.text;
    }

    // @Listen('mousedown', { capture: true })
    handleDragStart() {

        let prevOffsetX = 0;
        const select: OAISelect = this.select;
        const index = this.index;

        return function dragStart(e: DragEvent) {

            const { offsetX } = e;
            // Distinct until change && drag offset is larger than =>
            if (prevOffsetX == offsetX &&
                Math.abs(prevOffsetX - offsetX) < 4) {
                return;
            } else {
                prevOffsetX = offsetX
            };

            const { target } = e;
            const { offsetWidth } = (target as HTMLElement).parentElement as HTMLElement;
            // const nextCharWidth = (offsetWidth / textContent!.length);
            // console.log({ offsetX, offsetWidth, textContent, nextCharWidth });
            if (offsetX < 0) {
                console.log('handle resize before start');
                select && select.resizeOffsetStart(index);
            } else if (offsetX < offsetWidth) {
                console.log('handle resize after start (within boundries)');
            }
            // if (offsetX > charWidth * 2 && offsetX < offsetWidth - charWidth) {
            //     const mark = (this as any).parentNode;
            //     mark.normalize();
            //     const [, textNode] = mark.childNodes
            //     textNode.textContent = textNode.textContent.substring(1);
            //     // ((target as HTMLElement).parentElement as HTMLElement).textContent = ((target as HTMLElement).parentElement as HTMLElement).textContent || ''.substring(1);
            // }
        }
    }

    render() {
        return (
            <mark>
                <a onDrag={this.handleDragStart()} draggable />
                <slot />
                <a draggable />
            </mark >
        );
    }
}
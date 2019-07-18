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
    handleDrag() {

        let prevOffsetX = 0;
        const select: OAISelect = this.select;
        const index = this.index;


        return function dragStart(e: DragEvent) {

            const { offsetX } = e;
            console.log('going at it', offsetX)

            // Distinct until changed
            if (prevOffsetX == offsetX) { return; }

            prevOffsetX = offsetX;
            // Distinct until drag offset is larger than =>
            // if (Math.abs(offsetX) < getNextCharWidth(el)) { return; }

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

        }
    }

    render() {
        return (
            <mark>
                <a onDrag={this.handleDrag()} draggable />
                <slot />
                <a draggable />
            </mark >
        );
    }
}

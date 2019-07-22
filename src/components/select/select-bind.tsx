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
    @Prop({ reflectToAttr: true, mutable: true }) color!: string;
    @Element() el!: HTMLElement;
    get select(): OAISelect {
        return (this.el.parentNode as ShadowRoot).host as any;
    }

    // @Listen('mousedown', { capture: true })
    handleDrag(start: boolean) {

        let prevOffsetX = 0;
        const select = this.select;
        const index = this.index;

        return function onDrag(e: DragEvent) {

            const { offsetX } = e;

            // Distinct until changed
            if (prevOffsetX == offsetX) { return; }

            prevOffsetX = offsetX;

            const { target } = e;
            const { offsetWidth } = (target as HTMLElement).parentElement as HTMLElement;

            if (!select) { throw 'no select found'; }

            if (start) {

                if (offsetX < 0) {
                    select.expandStart(index, offsetX);
                } else if (offsetX < offsetWidth) {
                    select.condenseStart(index, offsetX);
                }

            } else {

                if (offsetX > 0) {
                    select.expandEnd(index, offsetX);
                } else if (Math.abs(offsetX) < offsetWidth) {
                    select.condenseEnd(index, offsetX);
                }
            }

        }

    }

    render() {
        return (
            <mark style={{ 'backgroundColor': this.color }}>
                <slot />
            </mark >
        );
    }
}

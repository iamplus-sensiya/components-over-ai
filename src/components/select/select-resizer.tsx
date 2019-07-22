import { Component, h } from '@stencil/core';

@Component({
    tag: 'oai-select-resizer',
    // shadow: true
})
export class OAISelectResizer {

    // @Listen('mousedown', { capture: true })
    handleDrag(start: boolean) {

        let prevOffsetX = 0;

        return function onDrag(e: DragEvent) {

            const { offsetX } = e;

            // Distinct until changed
            if (prevOffsetX == offsetX) { return; }
            prevOffsetX = offsetX;

            const { target } = e;
            const { offsetWidth } = (target as HTMLElement).parentElement as HTMLElement;

            console.log(offsetX)
            if (start) {

                if (offsetX < 0) {
                    console.log('expandStart')
                } else if (offsetX < offsetWidth) {
                    console.log('condenseStart')
                }

            } else {

                if (offsetX > 0) {
                    console.log('expandEnd')
                } else if (Math.abs(offsetX) < offsetWidth) {
                    console.log('condenseEnd')
                }
            }

        }

    }

    render() {
        return ([
            <a draggable onDrag={this.handleDrag(true)} >«</a>,
            <slot />,
            <a draggable onDrag={this.handleDrag(false)}>»</a>
        ]);
    }
}

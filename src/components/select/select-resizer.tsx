import { Component, h, Prop, Element, Listen } from '@stencil/core';
import { OAISelect } from './select';

@Component({
    tag: 'oai-select-resizer',
    styleUrl: 'select-resizer.scss',
    // shadow: true
})
export class OAISelectResizer {
    @Prop({ reflectToAttr: true, mutable: true }) index!: number;

    @Element() el!: HTMLElement;
    get select(): OAISelect {
        return (this.el.parentNode as ShadowRoot).host as any;
    }

    @Listen('mouseup', {
        capture: true,
        //   target?: 'parent' | 'body' | 'document' | 'window';
        // target: 'parent'
    })
    test(e: MouseEvent) {
        console.log(
            e.offsetX,
            this.getCaretCharacterOffsetWithin(this.el)
        );
    }

    getCaretCharacterOffsetWithin(element: any) {
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }

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
            const { offsetWidth, offsetLeft } = (target as HTMLElement).parentElement as HTMLElement;

            if (start) {

                if (offsetX < offsetLeft) {
                    console.log('expandStart', offsetLeft, offsetLeft)
                } else if (offsetX < offsetLeft + offsetWidth) {
                    console.log('condenseStart')
                }

            } else {

                if (offsetX > 0) {
                    const trasspass = offsetX - (offsetLeft + offsetWidth);
                    console.log('expandEnd', trasspass);
                    if (trasspass > 10) {
                        const segment = select.segments[index];
                        segment.text += 'T';
                        select.segments = [...select.segments]
                    }
                } else if (Math.abs(offsetX) < offsetWidth) {
                    console.log('condenseEnd')
                }
            }

        }

    }

    render() {
        const getHandle = () => <span class="handle"></span>;
        return ([
            <a class="handler" draggable onDrag={this.handleDrag(true)}>{getHandle()}</a>,
            <slot />,
            <a class="handler" draggable onDrag={this.handleDrag(false)}>{getHandle()}</a>
        ]);
    }
}

import { Component, h, Prop, Listen, Element, Event, EventEmitter } from '@stencil/core';
import { BindingColors } from './color-stack';
import { Expand } from './decorators';
import { unWrap, bindElem } from './utils';
import { Segment } from './segment.model';

const SEGMENTS = 'segments';

@Component({
    tag: 'oai-segments',
    styles: `.segments { word-wrap: break-word; word-break: break-word; white-space: pre-wrap; padding: 10px 0; line-height: 1.5; will-change: contents; }`,
    shadow: true
})
export class OAISegments {
    @Element() el!: HTMLElement;

    @Prop() segments: Segment[] = [];
    /** (optional) auto expand selection (default = false) */
    @Prop() autoExpand: boolean = true;

    @Event({ cancelable: true }) textSelected!: EventEmitter;

    @Listen('select')
    selectHandler(event: CustomEvent) {
        console.log('select', event);
    }

    colors = new BindingColors();

    @Listen('mouseup')
    handleMouseup() {

        const selection = this.el.shadowRoot!.getSelection();
        const range = selection && selection.rangeCount && selection.getRangeAt(0);
        const text = range && range.cloneContents().textContent;
        selection && range && text && this.textSelectedHandler(range, selection);

    }

    @Expand()
    textSelectedHandler(range: Range, selection: Selection) {
        this.textSelected.emit({
            bindSelectedText: this.segmentBindingFnFactory(range, selection)
        });
    }

    segmentBindingFnFactory(range: Range, selection: Selection) {

        return (value: string) => {

            // unwrap if same parent is a bound part
            // (meaning it is within a bound tag already)
            unWrap(range, selection);

            // range && range.surroundContents(bindElem(name)); // surroundContents will not strip down tags to plain text
            const text = range.extractContents().textContent || '';
            range.insertNode(
                bindElem(text, value, this.colors.getColor(value))
            );

            // clean up:
            //
            // remove ranges if any
            selection && selection.removeAllRanges();

            // call update event
            this.update();

        }
    }

    update() {
        // concat text nodes within parent element
        this.el.normalize();

        // const segmentsElem = this.el.shadowRoot!.querySelector(`.${SEGMENTS}`) as HTMLElement;
        // // while (segmentsElem.firstChild) {
        // //     segmentsElem.removeChild(segmentsElem.firstChild);
        // // }
        // console.log(segmentsRepresentationFromDomElement(segmentsElem));

    }

    render() {
        return (
            <div class={SEGMENTS} spellcheck>
                {this.segments.map(({ text, value }) =>
                    value ?
                        <oai-resizer color={this.colors.getColor(value)} value={value}>
                            {text}
                        </oai-resizer> :
                        text
                )}
            </div>
        );
    }
}
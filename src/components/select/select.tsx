import {
    Component, h, Listen, Element,
    Event, EventEmitter, Prop, Host, Method
} from '@stencil/core';
import { BindingColors } from './color-stack';

export interface Segment {
    text: string;
    value?: string;
};

// type Offsets = {
//     startOffset: number;
//     endOffset: number;
// };

@Component({
    tag: 'oai-select',
    styles: `:host { word-wrap: break-word; word-break: break-word; white-space: pre-wrap; }`,
    shadow: true
})
export class OAISelect {
    @Prop() segments: Segment[] = [];

    /** (optional) auto expand selection (default = false) */
    @Prop() autoExpand: boolean = false;

    @Element() el!: HTMLElement;

    colors = new BindingColors();

    @Listen('mouseup')
    handleMouseup() {

        const selection = this.el.shadowRoot!.getSelection();
        try {
            const range = selection && selection.getRangeAt(0);
            const text = range && range.cloneContents().textContent;
            if (text) {
                this.textSelectedHandler(range, selection);
            }
        } catch{ }


    }

    @Event() update!: EventEmitter;
    updateHandler() {
        console.log('updated');

        this.update.emit(segmentsRepresentationFromDomElement(this.el));
    }

    @Event({ cancelable: true }) textSelected!: EventEmitter;
    textSelectedHandler(range: Range | null, selection: Selection | null) {

        if (range && this.autoExpand) {

            const { startContainer, startOffset } = range;
            range.setStart(startContainer, getTextBoundry(startContainer, startOffset, -1));

            const { endContainer, endOffset } = range;
            range.setEnd(endContainer, getTextBoundry(endContainer, endOffset, 1) + 1);

        }

        this.textSelected.emit({
            bindSelectedText: this.bindSelectedTextFactory(range, selection)
        });
    }

    bindSelectedTextFactory(range: Range | null, selection: Selection | null) {

        return (name: string) => {
            if (!range) { return; }
            // unwrap if same parent is a bound part
            // (meaning it is within a bound tag already)
            unWrap(range, selection);

            // range && range.surroundContents(bindElem(name)); // surroundContents will not strip down tags to plain text
            const text = range.extractContents().textContent || ''
            range.insertNode(
                bindElem(name, text)
            );

            // clean up:
            //
            // remove ranges if any
            selection && selection.removeAllRanges();

            // concat text nodes within parent element
            this.el.normalize();

            // call update event
            this.updateHandler();

        }
    }

    @Method()
    async expandStart(i: number, offsetX: number) {
        const prevSegment = this.segments[i - 1];
        const { text: prevText } = prevSegment;
        const candiadateChar = prevText.substring(prevText.length - 1);

        if (this.distinctCharOffset(offsetX, candiadateChar)) { return; }

        prevSegment.text = prevText.substring(0, prevText.length - 1);
        const segment = this.segments[i];
        segment.text = `${candiadateChar}${segment.text}`;
        // reassign data for invoking a change detection
        this.segments = [...this.segments];
        this.updateHandler();
    }

    @Method()
    async condenseStart(i: number, offsetX: number) {
        const segment = this.segments[i];

        const candiadateChar = segment.text.substring(0, 1);
        if (this.distinctCharOffset(offsetX, candiadateChar)) { return; }

        const prevSegment = this.segments[i - 1];
        // const { text: prevText } = prevSegment;

        segment.text = segment.text.substring(1);
        prevSegment.text = `${prevSegment.text}${candiadateChar}`;
        // reassign data for invoking a change detection
        this.segments = [...this.segments];
        this.updateHandler();
    }

    @Method()
    async expandEnd(i: number, offsetX: number) {
        const nextSegment = this.segments[i + 1];
        const { text: nextText } = nextSegment;
        const candiadateChar = nextText.substring(0, 1);

        if (this.distinctCharOffset(offsetX, candiadateChar)) { return; }

        nextSegment.text = nextText.substring(1);
        const segment = this.segments[i];
        segment.text = `${segment.text}${candiadateChar}`;
        // reassign data for invoking a change detection
        this.segments = [...this.segments];
        this.updateHandler();
    }

    @Method()
    async condenseEnd(i: number, offsetX: number) {
        const segment = this.segments[i];

        const candiadateChar = segment.text.substring(segment.text.length - 1);
        if (this.distinctCharOffset(offsetX, candiadateChar)) { return; }

        const nextSegment = this.segments[i + 1];

        segment.text = segment.text.substring(0, segment.text.length - 1);
        nextSegment.text = `${candiadateChar}${nextSegment.text}`;
        // reassign data for invoking a change detection
        this.segments = [...this.segments];
        this.updateHandler();
    }

    // Distinct until drag offset is larger than =>
    private distinctCharOffset(offsetX: number, candiadateChar: string) {
        return Math.abs(offsetX) < calculateCharWidth(this.el, candiadateChar);
    }

    render() {
        return (
            <Host spellcheck>
                {this.segments.map(({ text, value }, i) => value ?
                    <oai-select-resizer index={i}>
                        <oai-select-bind value={value} index={i} color={this.colors.newColor()}>
                            {text}
                        </oai-select-bind>
                    </oai-select-resizer> :
                    text
                )}
            </Host>
        );
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
function unWrap(range: Range | null, selection: Selection | null) {

    const boundElem = range && range.startContainer === range.endContainer &&
        range.startContainer.parentElement &&
        range.startContainer.parentElement.closest('oai-select-bind');

    if (range && boundElem && boundElem.textContent) {
        // keep offsets to reassign selection
        // upon element replacement
        const { startOffset, endOffset } = range;

        // selection && selection.removeAllRanges();
        range.collapse();

        // replace bound tag with plain textNode
        const textNode = document.createTextNode(boundElem.textContent);
        boundElem.replaceWith(textNode);

        // Reselect user's selection
        // const newRange = document.createRange();
        range.setStart(textNode, startOffset);
        range.setEnd(textNode, endOffset);
        selection && selection.addRange(range);
    }

}

function bindElem(value: string, text: string = '') {
    const elem = document.createElement('oai-select-bind');
    elem.setAttribute('value', value);
    elem.textContent = text;
    return elem;
}

function getTextBoundry(node: Node, i: number, increment: number): number {

    if (Boolean(
        node.textContent &&
        node.textContent.charAt(i + increment) &&
        node.textContent.charAt(i + increment).trim()
    )) { return getTextBoundry(node, i + increment, increment); }

    return i;

}

function calculateCharWidth(select: HTMLElement, char: string) {
    const fontSize = getComputedStyle(select as any).getPropertyValue('font-size');
    const fontFamily = getComputedStyle(select as any).getPropertyValue('font-family');
    const letterSpacing = getComputedStyle(select as any).getPropertyValue('letter-spacing');

    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");

    if (!ctx) { throw ('could not get CanvasRenderingContext2D'); }

    c.style.letterSpacing = letterSpacing;
    ctx.font = `${fontSize} ${fontFamily}`;

    return ctx.measureText(char).width;
}

function segmentsRepresentationFromDomElement(el: HTMLElement): Segment[] {
    const sr = el.shadowRoot
    const nodes = sr && sr.childNodes && Array.from(sr.childNodes) || [];

    const ObjectRepresentation = nodes
        .filter(({ nodeType, nodeName, textContent }) =>
            typeof textContent == 'string' &&
            !!textContent.length &&
            nodeType === Node.TEXT_NODE ||
            nodeName === 'OAI-SELECT-BIND'
        )
        .map(({ textContent: text, value }: any) => ({ text, value }))


    // .map(({ textContent: text }) => ({ text }))

    console.log(ObjectRepresentation)

    // .reduce((a, b) => a + b.textContent, '')
    // nodes&& [...nodes].map(node => { text: node.textContent })
    // Object.fromEntries(
    //     Object
    //         .entries(ObjectRepresentation)
    //         .filter(([, v]) => Boolean(v))
    // )

    return ObjectRepresentation;//(ObjectRepresentation || []) as Segment[];
}
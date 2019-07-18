import {
    Component, h, Listen, Element,
    Event, EventEmitter, Prop, Host, Method
} from '@stencil/core';

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
    @Prop() autoExpand: boolean = true;

    @Element()
    el!: HTMLElement;

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
        this.update.emit('hellloooo');
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

            // unwrap if same parent is a bound part
            // (meaning it is within a bound tag already)
            unWrap(range, selection);

            // range && range.surroundContents(bindElem(name)); // surroundContents will not strip down tags to plain text
            range && range.insertNode(
                bindElem(name, range.extractContents().textContent || '')
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
    async resizeOffsetStart(i: number) {
        const prevSegment = this.segments[i - 1];
        const { text: prevText } = prevSegment;
        prevSegment.text = prevText.substring(0, prevText.length - 1)
        const segment = this.segments[i];
        segment.text = `${prevText.substring(prevText.length - 1)}${segment.text}`;

        // reassign data for invoking a change detection
        this.segments = [...this.segments];
    }

    render() {
        return (
            <Host spellcheck>
                {this.segments.map(({ text, value }, i) => value ?
                    <oai-select-bind value={value} index={i}>
                        {text}
                    </oai-select-bind> :
                    text
                )}
            </Host>
        );
    }
}
////////////////////////////////
////////////////////////////////
////////////////////////////////
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

function bindElem(name: string, text: string = '') {
    const elem = document.createElement('oai-select-bind');
    elem.setAttribute('name', name);
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
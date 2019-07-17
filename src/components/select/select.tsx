import {
    Component, h, Listen, Element,
    Event, EventEmitter, Prop, Host
} from '@stencil/core';

// type Offsets = {
//     startOffset: number;
//     endOffset: number;
// };

@Component({
    tag: 'oai-select',
    // shadow: true
})
export class OAISelect {
    @Prop() data = [];

    /** (optional) auto expand selection (default = false) */
    @Prop() expand: boolean = true;

    @Element()
    el!: HTMLElement;

    @Listen('mouseup')
    handleMouseup() {

        const selection = window.getSelection();
        const range = selection && selection.getRangeAt(0);

        const text = range && range.cloneContents().textContent;
        if (text) {
            this.textSelectedHandler(range, selection);
        }

    }

    @Event() update!: EventEmitter;
    updateHandler() {
        console.log('updated');
        this.update.emit('hellloooo');
    }

    @Event({ cancelable: true }) textSelected!: EventEmitter;
    textSelectedHandler(range: Range | null, selection: Selection | null) {

        if (range && this.expand) {

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

    render() {
        return (
            <Host>
                {this.data.map(({ text, value }) => value ?
                    <oai-select-bind name={value}>
                        {text}
                    </oai-select-bind> :
                    text)}
            </Host>
        );
    }
}

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
        node.textContent[i + increment] &&
        node.textContent[i + increment].trim()
    )) { return getTextBoundry(node, i + increment, increment); }

    return i;

}
import {
    Component, h, Listen, Element,
    Event, EventEmitter, Prop, Host
} from '@stencil/core';

type Offsets = {
    startOffset: number;
    endOffset: number;
};

@Component({
    tag: 'oai-select',
    // shadow: true
})
export class OAISelect {
    @Element()
    el!: HTMLElement;
    @Prop() data = [];

    @Listen('mouseup')
    handleMouseup() {
        const { startOffset, endOffset } = this.commonAncestorRange;
        if (Boolean(endOffset - startOffset)) {
            this.textSelectedHandler({ startOffset, endOffset });
        }
    }

    @Event({ cancelable: true }) textSelected!: EventEmitter;
    textSelectedHandler({ startOffset, endOffset }: Offsets) {
        // const { startContainer, startOffset, endContainer, endOffset } = this.range;
        console.log(startOffset, endOffset)
        this.textSelected.emit({
            bindSelectedText: this.bindSelectedTextFactory({ startOffset, endOffset })
        });
    }

    @Event() update!: EventEmitter;
    updateHandler() {
        console.log('updated');
        this.update.emit('hellloooo');
    }

    get commonAncestorRange() {
        var selection = window.getSelection();
        const range = selection!.getRangeAt(0);
        const clone = range.cloneRange();
        clone.selectNodeContents(this.el);
        clone.setEnd(range.endContainer, range.endOffset);
        const length = range.toString().length;
        const endOffset = clone.toString().length;
        const startOffset = endOffset - length;
        return { startOffset, endOffset };
    }

    // unWrapBindings(range: Range) {

    //     console.log(9);

    //     [].forEach.call(this.el.querySelectorAll('oai-select-bind'), (node: any) =>
    //         range.intersectsNode(node) && node.replaceWith(node.innerText)
    //     );
    //     // const contents = range.cloneContents();
    //     // const bindNodes = contents.querySelectorAll('oai-select-bind');
    //     // console.log()
    //     // bindNodes.forEach(node => node.replaceWith(document.createTextNode(node.textContent || '')))
    // }

    bindSelectedTextFactory({ startOffset, endOffset }: Offsets) {
        //TODO remove ranges if any
        var newRange = document.createRange();
        newRange.selectNodeContents(this.el);
        newRange.setStart(this.el, startOffset);
        newRange.setEnd(this.el, endOffset);

        return (name: string) => {

            // this.unWrapBindings(newRange);

            const bindNode = document.createElement('oai-select-bind');
            bindNode.setAttribute('name', name);
            const text = document.createTextNode(
                newRange.extractContents()
                    .textContent!);
            bindNode.appendChild(text);

            // newRange.insertNode(bindNode);

            // // clean up: concat text nodes within parent element
            // this.el.normalize();

            // newRange.collapse();

            // // fire update event
            // this.updateHandler();
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
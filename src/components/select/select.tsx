import { Component, h, Listen, Element, Event, EventEmitter, Prop, Host } from '@stencil/core';

@Component({
    tag: 'oai-select',
    shadow: true
})
export class OAISelect {
    @Element()
    el!: HTMLElement;

    @Prop() data = [];

    @Event() textSelected!: EventEmitter;
    textSelectedHandler() {
        this.textSelected.emit();
    }

    @Listen('mouseup')
    handleKeyDown() {
        var range = this.getCommonAncestorRange();

        if (Boolean(range.toString())) {
            this.textSelectedHandler();
            // console.log(range);
            // const contents = range.extractContents();

        }
    }

    getCommonAncestorRange() {
        var selection = window.getSelection();
        var range = selection!.getRangeAt(0);

        var clone = range.cloneRange();
        clone.selectNodeContents(this.el);
        clone.setEnd(range.endContainer, range.endOffset);
        clone.setStart(range.startContainer, range.startOffset);

        return clone;
    }

    render() {
        return (
            <Host>
                {this.data.map(({ text, value }) => value ? <oai-select-bind name={value}>{text}</oai-select-bind> : text)}
            </Host>
        );
    }
}
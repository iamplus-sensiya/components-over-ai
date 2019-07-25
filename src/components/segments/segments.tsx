import { Component, h, Prop, Listen, Element } from '@stencil/core';

@Component({
    tag: 'oai-segments',
    styles: `.segments { word-wrap: break-word; word-break: break-word; white-space: pre-wrap; padding: 10px 0;}`,
    shadow: true
})
export class OAISegments {
    @Element() el!: HTMLElement;

    @Prop() segments: Segment[] = [];

    @Listen('select')
    selectHandler(event: CustomEvent) {
        console.log('select', event);
    }

    render() {
        return (
            <div class="segments" spellcheck>
                {this.segments.map(({ text, value }) =>
                    value ?
                        <oai-resizer>
                            {text}
                        </oai-resizer> :
                        text
                )}
            </div>
        );
    }
}
import { Component, h, Prop, Listen, Element } from '@stencil/core';
import { BindingColors } from './color-stack';

@Component({
    tag: 'oai-segments',
    styles: `.segments { word-wrap: break-word; word-break: break-word; white-space: pre-wrap; padding: 10px 0; line-height: 1.5; }`,
    shadow: true
})
export class OAISegments {
    @Element() el!: HTMLElement;

    @Prop() segments: Segment[] = [];

    @Listen('select')
    selectHandler(event: CustomEvent) {
        console.log('select', event);
    }

    colors = new BindingColors();

    render() {
        return (
            <div class="segments" spellcheck>
                {this.segments.map(({ text, value }) =>
                    value ?
                        <oai-resizer color={this.colors.getColor(value)}>
                            {text}
                        </oai-resizer> :
                        text
                )}
            </div>
        );
    }
}
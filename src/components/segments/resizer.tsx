import { Component, h, Element } from '@stencil/core';

@Component({
    tag: 'oai-resizer',
    styleUrl: './resizer.scss',
})
export class OAIResizer {
    @Element() el!: HTMLElement;
    get container(): HTMLElement { return this.el.parentElement as HTMLElement; }
    get selection() {
        const shadowRoot = this.container.parentNode as ShadowRoot;
        return shadowRoot.getSelection();
    }

    get extractedContent() {
        const selection = this.selection;
        if (selection) {
            // console.log(selection.anchorNode)
            return selection.getRangeAt(0).extractContents();
        }
    };

    private reset() {
        if (this.selection)
            this.selection.removeAllRanges();
    }

    onMouseDown() {
        this.reset();
        this.container.onmousemove = this.onMouseMove().bind(this);
        this.container.onmouseup = this.removeMouseEvents.bind(this);
        this.container.onmouseleave = this.removeMouseEvents.bind(this);
    }

    removeMouseEvents() {
        console.log('removed mouse events!')
        this.container.onmousemove = null;
        this.container.onmouseup = null;
        this.container.onmouseleave = null;
        this.reset();
    }

    onMouseMove() {
        let x = 0;

        return (e: MouseEvent) => {

            const rect = this.el.getBoundingClientRect();
            x = e.clientX - rect.left;

            if (x > rect.width) {
                // console.log('going right')
                this.expandEnd(this.extractedContent);
            } else if (e.movementX < 0) {
                // console.log('going left')
                this.condenseEnd(this.extractedContent);
            }

        }

    }

    expandEnd(extractedContent: DocumentFragment | undefined) {
        if (extractedContent && extractedContent.textContent) {
            (this.el.querySelector('.selection') as HTMLElement)
                .innerText += extractedContent.textContent
        };
    }

    condenseEnd(extractedContent: DocumentFragment | undefined) {
        if (extractedContent && extractedContent.textContent) {
            this.el.after(document.createTextNode(extractedContent!.textContent))
        };
    }

    render() {

        const marker = (align: string) => <span class="marker">
            <span class={`handle handle-${align}`}
                onMouseDown={this.onMouseDown.bind(this)} />
        </span>;

        return ([
            marker('start'),
            <span class="selection">
                <slot />
            </span>,
            marker('end')
        ]);
    }
}
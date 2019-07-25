import { Component, h, Element, Listen, State } from '@stencil/core';
const MARKER_CLASS = 'marker';
const HANDLE_CLASS = 'handle';
enum Alignment {
    Start = 'start',
    End = 'end'
}
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
    @State() showMarkers = true;

    @Listen('mouseenter')
    mouseEnterHandler() { this.showMarkers = true; }
    // @Listen('mouseleave')
    // mouseLeaveHandler() { this.showMarkers = false; }

    private reset() {
        if (this.selection)
            this.selection.removeAllRanges();
    }

    onMouseDown(markerHandler: Function) {
        this.container.onmousemove = this.onMouseMove(markerHandler).bind(this);
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

    onMouseMove(markerHandler: Function) {
        // return () => {
        //     const selection = this.selection;
        //     if (!selection) { return; }
        //     const range = selection.getRangeAt(0);

        //     console.log(range.intersectsNode(this.el.querySelector('.selection')!))
        // }
        // let x = 0;

        return () => {
            // const rect = this.el.getBoundingClientRect();
            // x = e.clientX - rect.left;

            const selection = this.selection;

            if (!selection || !selection.toString() || selection.toString().length < 1) { return; }
            const range = selection.getRangeAt(0);

            markerHandler.call(this, range);

            range.collapse();

        }

    }

    markerStartHandler(range: Range) {
        console.log('START', range.intersectsNode(this.el.querySelector('.selection')!))
    }

    markerEndHandler(range: Range) {
        // console.log('END', range.intersectsNode(this.el.querySelector('.selection')!))

        const isCondense = range.intersectsNode(this.el.querySelector('.selection')!);

        if (isCondense) {
            // condense
            range.setEndBefore(this.el.querySelector(`.${HANDLE_CLASS}-end`)!.parentNode!);
            const contents = range.extractContents();
            if (contents && contents.textContent) {
                this.el.after(document.createTextNode(contents!.textContent))
            };
        } else {
            // expand
            range.setStartAfter(this.el);
            const contents = range.extractContents();
            (this.el.querySelector('.selection') as HTMLElement)
                .innerText += contents.textContent;
        }

    }

    render() {

        const marker = (align: string) => <span class={MARKER_CLASS}
            onMouseDown={this.onMouseDown.bind(
                this,
                align == Alignment.Start
                    ? this.markerStartHandler
                    : this.markerEndHandler
            )} >
            <span class={`${HANDLE_CLASS} ${HANDLE_CLASS}-${align}`} />
        </span>;

        return ([
            this.showMarkers ? marker('start') : null,
            <mark class="selection">
                <slot />
            </mark>,
            this.showMarkers ? marker('end') : null
        ]);

    }
}



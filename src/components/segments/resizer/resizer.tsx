import { Component, h, Element, Listen, State, Prop } from '@stencil/core';
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
    @Prop({ reflectToAttr: true, mutable: true }) value!: string;
    @Prop({ mutable: true }) color!: string;
    get container(): HTMLElement { return this.el.parentElement as HTMLElement; }
    get selection() {
        const shadowRoot = this.container.parentNode as ShadowRoot;
        return shadowRoot.getSelection();
    }
    @State() showMarkers = false;

    @Listen('mouseenter')
    mouseEnterHandler() { this.showMarkers = true; }
    // @Listen('mouseleave')
    // mouseLeaveHandler(e: MouseEvent) {
    //     console.log(e.offsetY)
    //     // TODO expand mouse leaving boundaries before hiding markers
    //     this.showMarkers = false;
    // }

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

        return (e: MouseEvent) => {
            const rect = this.el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            console.log(rect, x)

            const selection = this.selection;

            if (!selection || !selection.toString() || selection.toString().length < 1) { return; }
            const range = selection.getRangeAt(0);

            markerHandler.call(this, range);

            range.collapse();

        }

    }


    private isCondense(range: Range) {
        return range.intersectsNode(this.el.querySelector('.selection')!);
    }

    markerStartHandler(range: Range) {

        if (this.isCondense(range)) {
            // condense
            range.setStartAfter(this.el.querySelector(`.${HANDLE_CLASS}-${Alignment.Start}`)!.parentNode!);
            const contents = range.extractContents();
            if (contents && contents.textContent) {
                this.el.before(document.createTextNode(contents!.textContent))
            };
        } else {
            // expand
            range.setEndBefore(this.el);
            const contents = range.extractContents();
            if (contents && contents.textContent) {
                const selectionNode = (this.el.querySelector('.selection') as HTMLElement);
                selectionNode.innerText = contents.textContent + selectionNode.innerText;
            }
        }

    }

    markerEndHandler(range: Range) {

        if (this.isCondense(range)) {
            // condense
            range.setEndBefore(this.el.querySelector(`.${HANDLE_CLASS}-${Alignment.End}`)!.parentNode!);
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

    componentDidRender() {
        // console.log(this.el.querySelector('.selection'))
        setTimeout(() =>
            (this.el.querySelector('.selection') as any)
                .attributeStyleMap
                .set('--highlighter-progress', 1)
        );
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
            this.showMarkers ? marker(Alignment.Start) : null,
            <mark class="selection" style={{ '--highlighter-color': this.color }}>
                <slot />
            </mark>,
            this.showMarkers ? marker(Alignment.End) : null
        ]);

    }
}



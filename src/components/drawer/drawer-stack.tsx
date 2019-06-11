import { Component, h, Element, State, Method } from '@stencil/core';

@Component({
    tag: 'oai-drawer-stack',
    styles: `
    .backdrop {
        background-color: rgba(0, 0, 0, .2);
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        animation: show 350ms ease;
    }
    @keyframes show {
        0% {
            opacity: 0;
        }
    }
    @keyframes hide {
        100% {
            opacity: 0;
        }
    }
    `,
    shadow: true
})
export class OAIDrawersStack {
    @Element()
    el!: OAIDrawersStack;
    @State() drawers: { html: any; width: string }[] = [];

    @Method()
    async push(tmpl: HTMLTemplateElement, config: { width: string }) {
        console.log(tmpl)
        this.drawers = [...this.drawers, { html: <h2>Flower</h2>, ...config }];
    }

    @Method()
    async pop() {
        console.log(17)
        const drawers = ((this.el as any).shadowRoot as ShadowRoot).querySelectorAll('oai-drawer');
        const itemToRemove = drawers.item(drawers.length - 1);
        const restOfDrawers = Array.from(drawers).slice(0, drawers.length - 1);
        this.positionDrawers(restOfDrawers);
        setTimeout(() => {
            itemToRemove.style.animationName = 'hide';
            (itemToRemove as any).previousSibling.style.animationName = 'hide';
            itemToRemove.addEventListener('animationend', () => this.drawers = this.drawers.splice(0, this.drawers.length - 1), false);
        }, 100);
    }

    componentDidRender() {

        const drawers = ((this.el as any).shadowRoot as ShadowRoot).querySelectorAll('oai-drawer');
        this.positionDrawers(Array.from(drawers));

    }

    getXfromMatrix(transform: string): string | null {
        const numberPattern = /\d+\.?\d+|\d+/g;
        const values = transform.match(numberPattern);
        return values && values[4];
    }

    positionDrawers(drawers: HTMLOaiDrawerElement[]): void {
        let offsetsArr: string[] = [];
        let offsetSum: string[] = [];
        for (let i = drawers.length - 1; i >= 0; i--) {
            const current = drawers[i];
            const next = drawers[i + 1];

            const calcStr = (width: string | null) => {
                if (width) {
                    offsetSum.push(`${width}`);
                }
                return `${offsetSum.join(' + ')}`
            };

            const translateX = next ? calcStr(getComputedStyle(next as unknown as Element).width) : null;
            // prevent exceeding from the viewport
            const { width } = getComputedStyle(current as any);
            const testDiv = document.createElement('div');
            testDiv.style.width = `calc(${width} + ${translateX})`;
            testDiv.style.display = 'none';
            document.body.append(testDiv);
            const testDivWidth = parseInt(getComputedStyle(testDiv).width || '');
            const bodyWidth = parseInt(getComputedStyle(document.body).width || '');
            document.body.removeChild(testDiv);

            if (Number.isNaN(testDivWidth) || Number.isNaN(bodyWidth)) {
                offsetsArr = ['0', ...offsetsArr];
            } else if (testDivWidth <= bodyWidth) {
                offsetsArr = [`${translateX ? `calc(-1 * (${translateX}))` : 0}`, ...offsetsArr];
            } else {
                offsetsArr = [`calc(-${bodyWidth}px + ${width})`, ...offsetsArr];
            }

        }

        for (let i = drawers.length - 1; i >= 0; i--) {
            drawers[i].style.transform = `translateX(${offsetsArr[i]})`
        }

    }

    render() {
        return (this.drawers.map(({ html, width }) =>
            [
                <div class="backdrop" onClick={this.pop.bind(this)}></div>,
                <oai-drawer width={width} stack={this.el}>
                    {html}
                </oai-drawer>
            ]
        ))
    }
}
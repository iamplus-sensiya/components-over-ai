import { Component, h, Element, State, Method } from '@stencil/core';

@Component({
    tag: 'oai-drawer-stack',
    shadow: true
})
export class OAIDrawersStack {
    @Element()
    el!: HTMLElement;
    @State() drawers: { html: any; width: string }[] = [];

    @Method()
    async push(tmpl: HTMLTemplateElement, config: { width: string }) {
        // ! we render the new array twice, once to append new drawer to the DOM
        // ! and once for it to update the offset
        // const clone = document.importNode(tmpl.content, true);
        console.log(tmpl)
        this.drawers = [...this.drawers, { html: <h2>Flower</h2>, ...config }];
        // // console.log(newDrawers);
        // // if (newDrawers.length > 1) {
        // // let offset = '';
        // for (let i = this.drawers.length - 1; i >= 0; i--) {
        //     // debugger;
        //     if (!this.drawers[i + 1]) { continue; }
        //     const { offset } = this.drawers[i + 1];
        //     setTimeout(() => {

        //         const nextDrawer = (this.el.shadowRoot as ShadowRoot).querySelectorAll('oai-drawer')[i + 1];
        //         console.log('h', getComputedStyle(nextDrawer as any).width)
        //         this.drawers[i].offset = `-${getComputedStyle(nextDrawer as any).width}`;
        //         if (offset) { this.drawers[i].offset += ` + ${offset}` }
        //         // offset += newDrawers[i].width;
        //         // newDrawers[i].width = 
        //     }, 0)
        // }
        // }
        // div.append(tmpl.content);
        // div.innerHTML
        // console.log(newDrawers);
        // this.drawers = newDrawers;
    }

    componentDidRender() {
        this.positionDrawers();
        // this.positionDrawers();
    }

    getXfromMatrix(transform: string): string | null {
        const numberPattern = /\d+\.?\d+|\d+/g;
        const values = transform.match(numberPattern);
        return values && values[4];

    }

    positionDrawers() {
        const drawers = (this.el.shadowRoot as ShadowRoot).querySelectorAll('oai-drawer');
        // console.log(drawers);
        let offsetSum: string[] = [];
        for (let i = drawers.length - 1; i >= 0; i--) {
            const current = drawers.item(i);
            const next = drawers.item(i + 1);
            // offsetSum += next ? ` - ${getComputedStyle(next as unknown as Element).width}` : 0;
            const calcStr = (width: string | null) => {
                if (width) {
                    offsetSum.push(`${width}`);
                }
                return `${offsetSum.join(' + ')}`
            };

            // if (transform) {
            //     const x = this.getXfromMatrix(transform);
            //     console.log(width, x);
            // }
            const translateX = next ? calcStr(getComputedStyle(next as unknown as Element).width) : null;
            // prevent exceeding from the viewport
            // const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            const { width } = getComputedStyle(current as any);
            const testDiv = document.createElement('div');
            testDiv.style.width = `calc(${width} + ${translateX})`;
            testDiv.style.display = 'none';
            document.body.append(testDiv);
            const testDivWidth = parseInt(getComputedStyle(testDiv).width || '');
            const bodyWidth = parseInt(getComputedStyle(document.body).width || '');
            document.body.removeChild(testDiv);
            if (!Number.isNaN(testDivWidth) && !Number.isNaN(bodyWidth)) {
                if (testDivWidth <= bodyWidth) {
                    (current as any).style.transform = `translateX(${translateX ? `calc(-1 * (${translateX}))` : 0})`;
                    console.table(bodyWidth, testDivWidth);
                } else {
                    (current as any).style.transform = `translateX(calc(-${bodyWidth}px + ${width}))`;
                }
            }

            // console.log(bodyWidth, translateX ? `calc(-1 * (${translateX}))` : 0);

            // console.log(current, `translateX(calc(${offsetSum}))`);
            // const { offset } = this.drawers[i + 1];

            // const allDrawers = (this.el.shadowRoot as ShadowRoot).querySelectorAll('oai-drawer');
            // const nextDrawer = allDrawers[i];
            // console.log('h', getComputedStyle(nextDrawer as any).width)
            // this.drawers[i].offset = `-${getComputedStyle(nextDrawer as any).width}`;
            // if (offset) { this.drawers[i].offset += ` + ${offset}` }
            // offset += newDrawers[i].width;
            // newDrawers[i].width = 
        }
        // drawers.forEach((drawer, i) => {
        //     console.log(drawer)
        //     const next = drawers.item(i + 1);
        //     const nextWidth = next ? getComputedStyle(next as unknown as Element).width : 0;
        //     console.log(nextWidth)
        // });
        // debugger;
        // console.log('will render')
        // if (this.drawers.length > 1) {
        //     for (let i = this.drawers.length - 1; i >= 0; i--) {
        //         debugger;
        //         if (!this.drawers[i + 1]) { continue; }
        //         const { offset } = this.drawers[i + 1];

        //         const allDrawers = (this.el.shadowRoot as ShadowRoot).querySelectorAll('oai-drawer');
        //         const nextDrawer = allDrawers[i];
        //         console.log('h', getComputedStyle(nextDrawer as any).width)
        //         this.drawers[i].offset = `-${getComputedStyle(nextDrawer as any).width}`;
        //         if (offset) { this.drawers[i].offset += ` + ${offset}` }
        //         // offset += newDrawers[i].width;
        //         // newDrawers[i].width = 
        //     }
        // }
        // setTimeout(() => {

        //     this.drawers = updatedDrawers;
        //     console.log(this.drawers)
        // }, 3000)
    }

    // disconnectedcallback() {
    //     console.log(this.el)
    // }
    // show() {
    //     var style = window.getComputedStyle(document.body);
    //     var matrix = new WebKitCSSMatrix(style.webkitTransform);
    //     document.body.style.setProperty(
    //         'transform',
    //         `translateX(${matrix.m41 - this.width}px)`,
    //     );
    //     document.body.style.setProperty(
    //         'transition',
    //         `.35s ease`,
    //     );
    //     // document.body.style.setProperty(
    //     //     'overflow',
    //     //     `hidden`,
    //     // );
    //     // modal.showModal();
    // };

    // hide() {
    //     // target === modal && (modal.close(), document.body.style.transform = 'translateX(0)');
    // };

    // componentWillUpdate() {
    //     console.log(this.open);
    //     this.open ? this.show() : this.hide();
    // }
    render() {
        return <aside>
            {
                this.drawers.map(({ html, width }) =>
                    // <div>{offset}</div>
                    <oai-drawer width={width}>
                        {html}
                    </oai-drawer>
                )
            }
        </aside>


        // [
        // <slot />,
        // <dialog open={this.open}>
        //     <slot name="drawer-content" />
        // </dialog>]

    }
}
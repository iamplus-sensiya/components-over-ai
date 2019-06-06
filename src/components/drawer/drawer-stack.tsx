import { Component, h, Prop, State, Method } from '@stencil/core';

@Component({
    tag: 'oai-drawer-stack',
    shadow: true
})
export class OAIDrawersStack {

    @Prop() open = false;
    @Prop() width = '200px';

    @State() drawers: { html: any; width: string, offset?: string }[] = [];

    @Method()
    async push(tmpl: HTMLTemplateElement, config: { width: string }) {
        // const clone = document.importNode(tmpl.content, true);
        console.log(tmpl)
        const newDrawers = [...this.drawers, { html: <h2>Flower</h2>, ...config }];
        console.log(newDrawers);
        if (newDrawers.length > 1) {
            for (let i = 0; i < newDrawers.length; i++) {
                newDrawers[i].offset = `calc(100% - ${newDrawers[i].width})`;
                // newDrawers[i].width = 
            }
        }
        // div.append(tmpl.content);
        // div.innerHTML
        // console.log(tmpl);
        this.drawers = [...this.drawers, { html: <h2>Flower</h2>, ...config }];
    }
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

        return (
            <div>
                <h1>DRAWERSSSSS</h1>
                {
                    this.drawers.map(({ html, width, offset }) =>
                        <oai-drawer width={width} offset={offset}>
                            {html}
                        </oai-drawer>
                    )
                }
            </div>

            // [
            // <slot />,
            // <dialog open={this.open}>
            //     <slot name="drawer-content" />
            // </dialog>]
        )
    }
}
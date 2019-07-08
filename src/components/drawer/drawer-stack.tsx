import {
    Component, h, Element, Prop,
    Method, Listen, Event, EventEmitter
} from '@stencil/core';

type poppedEventDetails = {
    drawer: string;
    payload?: any;
};


@Component({
    tag: 'oai-drawer-stack',
    styles: `
        .backdrop {
            background-color: rgba(0, 0, 0, .4);
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
    @Prop({ reflectToAttr: true }) stack: string = '';

    @Element()
    el!: HTMLElement;

    @Listen('click', { capture: true })
    handleClickOutside({ target }: Event) {
        const topDrawer = this.stackAsArray.slice(-1)[0];
        const isOutside = !(target as Element).closest(`[slot="${topDrawer}"]`);
        isOutside && this.pop();
    }

    @Event() drawerPopped!: EventEmitter;

    drawerPoppedHandler(details: poppedEventDetails) {
        this.drawerPopped.emit(details);
    }

    @Method()
    async push(name: string) {
        const newStack = this.stackAsArray;
        newStack.push(name)
        this.stack = newStack.join();
    }

    @Method()
    async pop(payload?: any) {

        const i = this.stackDomElements.length - 1;
        const item = this.stackDomElements[i];
        const siblings = this.stackDomElements.slice(0, i);
        const backdropItem: HTMLElement | null = this.el.shadowRoot && this.el.shadowRoot.querySelector(`.backdrop.${this.stackAsArray[i]}`);

        this.positionDrawers(siblings);

        await new Promise(resolve => setTimeout(resolve, 100));
        item.style.animationName = 'hide';
        if (backdropItem) { backdropItem.style.animationName = 'hide'; }

        await new Promise(resolve => item.addEventListener('animationend', resolve, { capture: false, once: true }));
        const poppedDrawer = this.stackAsArray[this.stackAsArray.length - 1];
        this.stack = this.stackAsArray.slice(0, this.stackAsArray.length - 1).join();
        item.style.animationName = '';
        this.drawerPoppedHandler({
            payload,
            drawer: poppedDrawer
        });

    }

    get stackAsArray(): string[] {
        return typeof this.stack == 'string' && this.stack.split(',')
            .map(s => s.trim())
            .filter(Boolean) || [];
    }

    get stackDomElements(): HTMLOaiDrawerElement[] {
        return this.stackAsArray
            .map(name => this.el.querySelector(`oai-drawer[slot=${name}]`) as HTMLOaiDrawerElement)
            .filter(Boolean) || [];
    }

    componentDidRender() {
        // const template: HTMLTemplateElement | null = this.el.querySelector('template');
        // if (template) {
        //     const drawers = Array.from(template.content.children).filter(c => c.matches('[slot]'));
        //     console.log(drawers);
        // }
        this.positionDrawers(this.stackDomElements);
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
        return this.stackAsArray.map(name => [
            <div class={'backdrop ' + name} />,
            <slot name={name.trim()} />
        ])
    }
}
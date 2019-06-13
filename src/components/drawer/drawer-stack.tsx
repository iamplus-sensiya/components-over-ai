import { Component, h, Element, Prop, Method } from '@stencil/core';

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
    @Prop({ reflectToAttr: true }) stack: string = '';

    @Element()
    el!: HTMLElement;

    @Method()
    async push(name: string) {
        this.stack += `, ${name}`;
    }

    @Method()
    async pop() {

        const i = this.stackDomElements.length - 1;
        const item = this.stackDomElements[i];
        const siblings = this.stackDomElements.slice(0, i);
        const backdropItem: HTMLElement | null = this.el.shadowRoot && this.el.shadowRoot.querySelector(`.backdrop.${this.stackNames[i]}`);

        this.positionDrawers(siblings);

        await new Promise(resolve => setTimeout(resolve, 100));
        item.style.animationName = 'hide';
        if (backdropItem) { backdropItem.style.animationName = 'hide'; }

        await new Promise(resolve => item.addEventListener('animationend', resolve, false));
        this.stack = this.stack.substring(0, this.stack.lastIndexOf(','));
        item.style.animationName = '';

    }

    get stackNames(): string[] {
        return this.stack.split(',')
            .map(s => s.trim())
            .filter(Boolean) || [];
    }

    get stackDomElements(): HTMLOaiDrawerElement[] {
        return this.stackNames
            .map(name => this.el.querySelector(`oai-drawer[slot=${name}]`) as HTMLOaiDrawerElement)
            .filter(Boolean) || [];
    }

    componentDidRender() {
        this.positionDrawers(this.stackDomElements);
    }

    // getXfromMatrix(transform: string): string | null {
    //     const numberPattern = /\d+\.?\d+|\d+/g;
    //     const values = transform.match(numberPattern);
    //     return values && values[4];
    // }

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
        return this.stackNames.map(name => [
            <div class={'backdrop ' + name} onClick={this.pop.bind(this)} />,
            <slot name={name.trim()} />
        ])
    }
}
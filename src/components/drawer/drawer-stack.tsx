import {
    Component, h, Element, State,
    Event, EventEmitter, Method, Listen
} from '@stencil/core';


@Component({
    tag: 'oai-drawer-stack',
    styles: `
        .backdrop { background-color: rgba(0, 0, 0, .4); position: fixed; left: 0; top: 0; right: 0; bottom: 0; width: 100%; height: 100%; animation: show 350ms ease; }
        @keyframes show { 0% { opacity: 0; } }
        @keyframes hide { 100% { opacity: 0; } }
    `,
    shadow: true
})
export class OAIDrawersStack {

    drawersObserver?: MutationObserver;

    @Element()
    el!: HTMLElement;

    @State() slots: string[] = [];

    @Listen('click', { capture: true })
    handleClickOutside({ target }: Event) {
        const slotNames = this.getSlotsNames(this.getDrawerElements());
        const [activeDrawerName] = slotNames.slice(-1);
        const isOutside = !(target as Element).closest(`[slot="${activeDrawerName}"]`);
        isOutside && this.pop();
    }

    @Event() drawerPopped!: EventEmitter;
    drawerPoppedHandler(details: { payload: any }) {
        this.drawerPopped.emit(details);
    }

    @Method()
    async pop(payload?: any) {

        // if (!this.stack.length) { return; }
        const drawers = this.getDrawerElements();
        const i = drawers.length - 1;
        const item = drawers[i];
        const siblings = drawers.slice(0, i);
        const backdropItem: HTMLElement | null =
            this.el.shadowRoot &&
            this.el.shadowRoot.querySelector('.backdrop:not([hidden]):last-of-type');

        this.positionDrawers(siblings);

        await new Promise(resolve => setTimeout(resolve, 100));
        item.style.animationName = 'hide';
        if (backdropItem) { backdropItem.style.animationName = 'hide'; }

        await new Promise(resolve => item.addEventListener('animationend', resolve, { capture: false, once: true }));
        // const poppedDrawer = this.stack[this.stack.length - 1];
        // this.stack = this.stack.slice(0, this.stack.length - 1);
        item.style.animationName = '';
        item.remove();
        backdropItem && backdropItem.remove();

        this.drawerPoppedHandler({
            payload
            // drawer: poppedDrawer
        });

    }

    getDrawerElements(): HTMLOaiDrawerElement[] {
        return Array.from(this.el.querySelectorAll(`oai-drawer`)) || []
    }

    getSlotsNames(drawers: HTMLOaiDrawerElement[]): string[] {
        return drawers
            .filter((de: HTMLOaiDrawerElement) => typeof de.getAttribute('slot') == 'string')
            .map((de: HTMLOaiDrawerElement) => de.getAttribute('slot')) as string[];
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

    private observeDrawersChanges() {
        const config = { attributes: false, childList: true, subtree: false };
        // Callback function to execute when mutations are observed
        // const callback = function (mutationsList: MutationRecord[], observer: MutationObserver) {

        // };
        // Create an observer instance linked to the callback function
        this.drawersObserver = new MutationObserver(() => {
            setTimeout(() => {
                this.slots = this.getSlotsNames(this.getDrawerElements());
            })
        });

        // Start observing the target node for configured mutations
        this.drawersObserver.observe(this.el, config);
    }

    connectedCallback() {
        this.slots = this.getSlotsNames(this.getDrawerElements());
        this.observeDrawersChanges();
    }

    disconnectedCallback() {
        this.drawersObserver && this.drawersObserver.disconnect();
    }

    componentDidRender() {
        setTimeout(() => {
            this.positionDrawers(this.getDrawerElements());
        });
    }

    render() {
        return this.slots.map(name => [
            <div class={'backdrop ' + name} />,
            <slot name={name.trim()} />
        ])
    }
}
import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'oai-ripple',
})
export class OAIRipple {
    @Prop() el!: HTMLElement;

    // @Listen('click', { target: 'parent' })
    handleClick(ev: MouseEvent | TouchEvent) {
        const event = 'touches' in ev ? ev.touches.item(0) : ev;
        if (this.el instanceof HTMLElement && event) {
            const r = this.el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
            this.el.style.cssText = `--s: 0; --o: 1;`; this.el.offsetTop;
            this.el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${event.clientX - r.left}; --y:${event.clientY - r.top};`
        }
    }

    connectedCallback() {
        this.el.addEventListener('click', this.handleClick.bind(this));
    }

    disconnectedCallback() {
        this.el.removeEventListener('click', this.handleClick);
    }

}
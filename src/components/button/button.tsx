import { Component, h, Prop, Element, Listen } from '@stencil/core';

@Component({
    tag: 'oai-button',
    styleUrl: './button.scss',
    shadow: true
})
export class OAIButton {
    @Element() el!: HTMLElement;

    /** (optional) The minimum size of the button (xs / sm / lg / xl) */
    /** (optional) The type of the button (default = filled / outlined (stroked)) */

    /** (optional) The state of the button (default / disabled / pending) */
    @Prop({ reflectToAttr: true }) state: 'default' | 'disabled' | 'pending' = 'default';
    @Prop({ reflectToAttr: true }) color: 'pale' | 'primary' | 'accent' | 'error' | 'warn' = 'primary';

    @Listen('click', { capture: true })
    handleClick(ev: any) {
        console.log('click', ev);
        const el = this.el;
        // 'touches' in ev ? ev.touches[0] : ev;
        const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
        el.style.cssText = `--s: 0; --o: 1;`; el.offsetTop;
        el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${ev.clientX - r.left}; --y:${ev.clientY - r.top};`
    }

    render() {

        let pendingIndicator = this.state === 'pending' ?
            <oai-progress-indicator class="pending-indicator" color={this.color} /> : null;

        return (
            <button disabled={this.state === 'disabled' || this.state === 'pending'}>
                {pendingIndicator}
                <slot name="prefix" />
                <slot />
                <slot name="suffix" />
            </button>
        )

    }
}
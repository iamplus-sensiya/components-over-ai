import { Component, h } from '@stencil/core';


@Component({
    tag: 'oai-application-layout',
    styleUrl: './application-layout.scss',
    shadow: true
})
export class OAIApplicationLayout {

    render() {
        return (
            <main class="main-container">
                <div><slot name="notification" /></div>
                <header class="header"><slot name="header" /></header>
                <div class="content-container">
                    <slot name="content" />
                </div>
                <footer class="footer"><slot name="footer" /></footer>
            </main>
        );

    }
}



import { Component, h } from '@stencil/core';


@Component({
    tag: 'oai-application-layout',
    styleUrl: './application-layout.scss',
    shadow: true
})
export class OAIApplicationLayout {

    render() {
        return (
            <div class="main-container">
                <div><slot name="notification" /></div>
                <header><slot name="header" /></header>
                <nav class="subnav">
                    ...
</nav>
                <div class="content-container">
                    <div class="content-area">
                        <slot name="content" />
                    </div>
                    <nav class="sidenav">
                        ...
</nav>
                </div>
            </div>
        );

    }
}



import { Component, Prop, Element } from '@stencil/core';


@Component({
    tag: 'oai-include',
    // shadow: true
})
export class OAIInclude {
    @Element() el!: HTMLElement;
    @Prop() src!: string;
    html!: string;

    loaded() {
        console.log(this);
        // this.before((this.contentDocument.body || this.contentDocument).children[0]); this.remove()
    }

    async componentDidLoad() {
        this.html = await fetch(this.src)
            .then(response => {
                return response.text()
            });

        this.el.innerHTML = this.html;

        const scripts = this.el.querySelectorAll('script');
        scripts.forEach(this.loadScript.bind(this));



    }

    loadScript(script: HTMLScriptElement) {
        var newScript = document.createElement('script');
        var inlineScript = document.createTextNode(script.innerHTML);
        newScript.appendChild(inlineScript);
        this.el.appendChild(newScript);
    }

    // render() {

    //     return (
    //         <div innerHTML={this.html} />
    //     )

    // }
}
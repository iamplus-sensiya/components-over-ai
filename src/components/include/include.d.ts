export declare class OAIInclude {
    el: HTMLElement;
    src: string;
    html: string;
    loaded(): void;
    componentDidLoad(): Promise<void>;
    loadScript(script: HTMLScriptElement): void;
}

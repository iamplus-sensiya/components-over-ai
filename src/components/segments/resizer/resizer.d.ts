import '/assets/css-modules/highlighter.mjs';
export declare class OAIResizer {
    el: HTMLElement;
    value: string;
    color: string;
    readonly container: HTMLElement;
    readonly selection: Selection | null;
    showMarkers: boolean;
    mouseEnterHandler(): void;
    private reset;
    onMouseDown(markerHandler: Function): void;
    removeMouseEvents(): void;
    onMouseMove(markerHandler: Function): (e: MouseEvent) => void;
    private isCondense;
    markerStartHandler(range: Range): void;
    markerEndHandler(range: Range): void;
    componentDidRender(): void;
    render(): any[];
}

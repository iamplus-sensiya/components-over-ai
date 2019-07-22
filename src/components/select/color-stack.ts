const predefinedColors = ['red', 'green', 'blue'];
// // const colorsMap = new Map();
// const newColor = (() => {
//     let i = 0;
//     return () => colors[i]
// })();

// export function color() {
//     return newColor();
// }
export class BindingColors {
    private _colors: string[];
    private _index: number = 0;

    constructor(colors: string[] = predefinedColors) {
        this._colors = colors;
    }

    set index(i: number) {
        // console.log('index is set')
        this._index =
            i && i <= this._colors.length - 1 ?
                i : 0;
    }

    get index(): number {
        return this._index;
        // ++this._index >  ?
        // 0 : this.index;
    }

    newColor() {
        // console.log('newColor')

        return this._colors[this.index++];
    }

}

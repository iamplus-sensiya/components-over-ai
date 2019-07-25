const predefinedColors = ['#e1d276', '#ec6262', '#83d6b7', '#e4a8f9'];
const colorPairingMap = new Map();
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
        this._index =
            i && i <= this._colors.length - 1 ?
                i : 0;
    }

    get index(): number {
        return this._index;
    }

    getColor(value: string) {
        return colorPairingMap.get(value) ||
            colorPairingMap
                .set(value, this._colors[this.index++])
                .get(value);
    }

}

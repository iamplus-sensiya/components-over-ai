import { Color, CssClassMap } from "../interface";

/**
 * Create the mode and color classes for the component based on the classes passed in
 */
export function createColorClasses(color: Color | undefined | null): CssClassMap | undefined {
    return (typeof color === 'string' && color.length > 0) ? {
        'oai-color': true,
        [`oai-color-${color}`]: true
    } : undefined;
}
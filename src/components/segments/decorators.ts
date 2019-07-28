import { OAISegments } from "./segments";

export function Expand() {

    return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {

        const original = descriptor.value;

        descriptor.value = function (...[range, selection]: [Range, Selection]) {

            if ((this as OAISegments).autoExpand) {

                const { startContainer, startOffset } = range;
                range.setStart(startContainer, getTextBoundry(startContainer, startOffset, -1));

                const { endContainer, endOffset } = range;
                range.setEnd(endContainer, getTextBoundry(endContainer, endOffset - 1, 1) + 1);

                selection.removeAllRanges();
                selection.addRange(range);

            }

            return original.call(this, range, selection);

        };

        return descriptor;

    };
}

function getTextBoundry(node: Node, i: number, increment: number): number {
    if (Boolean(
        node.textContent &&
        node.textContent.charAt(i + increment) &&
        node.textContent.charAt(i + increment).trim()
    )) { return getTextBoundry(node, i + increment, increment); }
    return i;
}
const OAI_RESIZER_TAG = 'oai-resizer';

export function unWrap(range: Range, selection: Selection) {

    const boundElem = range && range.startContainer === range.endContainer &&
        range.startContainer.parentElement &&
        range.startContainer.parentElement.closest(OAI_RESIZER_TAG);

    if (range && boundElem && boundElem.textContent) {
        // keep offsets to reassign selection
        // upon element replacement
        const { startOffset, endOffset } = range;

        // selection && selection.removeAllRanges();
        range.collapse();

        // replace bound tag with plain textNode
        const textNode = document.createTextNode(boundElem.textContent);
        boundElem.replaceWith(textNode);

        // Reselect user's selection
        // const newRange = document.createRange();
        range.setStart(textNode, startOffset);
        range.setEnd(textNode, endOffset);
        selection && selection.addRange(range);
    }

}

export function bindElem(text: string = '', value: string, color: string) {
    const resizer = document.createElement(OAI_RESIZER_TAG);
    resizer.setAttribute('value', value);
    resizer.textContent = text;
    resizer.color = color;
    return resizer;
}

export function segmentsRepresentationFromDomElement(el: HTMLElement): Segment[] {

    const nodes = el && el.childNodes && Array.from(el.childNodes) || [];
    console.log(nodes)
    const ObjectRepresentation = nodes
        .filter(({ nodeType, nodeName, textContent }) =>
            typeof textContent == 'string' &&
            !!textContent.length &&
            nodeType === Node.TEXT_NODE ||
            nodeName === OAI_RESIZER_TAG.toUpperCase()
        )
        .map(({ textContent: text, value }: any) => ({ text, value }))


    // .map(({ textContent: text }) => ({ text }))

    // console.log(ObjectRepresentation)

    // .reduce((a, b) => a + b.textContent, '')
    // nodes&& [...nodes].map(node => { text: node.textContent })
    // Object.fromEntries(
    //     Object
    //         .entries(ObjectRepresentation)
    //         .filter(([, v]) => Boolean(v))
    // )

    return ObjectRepresentation;//(ObjectRepresentation || []) as Segment[];
}
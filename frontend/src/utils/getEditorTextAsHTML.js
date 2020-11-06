function getEditorTextAsHTML(slateObject) {
    if (slateObject) {
        let text = '';
        slateObject.forEach((item) => {
            if (item.type) {
                if (item.type === 'image') {
                    text += `<img src='${item.url}' />`;
                } else {
                    let child = '';
                    if (item.children)
                        child = getEditorTextAsHTML(item.children);
                    text += `<${item.type}>${child}</${item.type}>`;
                }
            } else {
                if (item.b) {
                    text += '<strong>';
                }
                if (item.i) {
                    text += '<em>';
                }
                if (item.u) {
                    text += '<u>';
                }
                text += item.text;
                if (item.u) {
                    text += '</u>';
                }
                if (item.i) {
                    text += '</em>';
                }
                if (item.b) {
                    text += '</strong>';
                }
            }
        });
        return text;
    }
    return '';
}

export default getEditorTextAsHTML;

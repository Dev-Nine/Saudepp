import api from '../services/api';

async function getEditorTextAsHTML(value) {
    if (value) {
        let text = '';
        for (const item of value) {
            if (item.type) {
                if (item.type === 'image') {
                    try {
                        const formData = new FormData();
                        const blob = await fetch(item.url);
                        formData.append('image', await blob.blob());
                        const res = await api.post('/images', formData);
                        const { imageId, imageType } = res.data;
                        text += `<img src='https://res.cloudinary.com/saudepp/image/upload/${imageId}.${imageType}' />`;
                    } catch (err) {
                        console.log('lmao yeet');
                        console.log(err);
                    }
                } else {
                    let child = '';
                    if (item.children) {
                        child = await getEditorTextAsHTML(item.children);
                    }
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
        }
        return text;
    }
    return '';
}

export default getEditorTextAsHTML;

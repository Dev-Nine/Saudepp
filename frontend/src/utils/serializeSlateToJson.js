import sanitizeHtml from 'sanitize-html';
import api from '../services/api';
import compressImage from './compressImage';

function isUrl(str) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i',
    ); // fragment locator
    return !!pattern.test(str);
}

function addImageProcess(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function sanitizeText(slateObject) {
    if (slateObject.length) {
        slateObject.forEach((element) => {
            if (element.text) {
                element.text = sanitizeHtml(element.text, {
                    allowedTags: [
                        'strong',
                        'em',
                        'h1',
                        'h2',
                        'h3',
                        'ul',
                        'ol',
                        'li',
                        'img',
                        'a',
                        'p',
                    ],
                    allowedAttributes: {
                        img: ['src'],
                        a: ['href'],
                    },
                });
            } else if (element.children) {
                sanitizeText(element.children);
            }
        });
    }
}

async function uploadImages(slateObject) {
    for (const element of slateObject) {
        if (element.type === 'image') {
            if (!isUrl(element.url)) {
                try {
                    const formData = new FormData();
                    const blob = await (await fetch(element.url)).blob();
                    const image = await addImageProcess(
                        URL.createObjectURL(blob),
                    );
                    const compressed = await compressImage(image, 0.85, 'eae');
                    formData.append('image', compressed);
                    const res = await api.post('/images', formData);
                    const { imageId, imageType } = res.data;
                    element.url = `https://res.cloudinary.com/saudepp/image/upload/${imageId}.${imageType}`;
                } catch (err) {
                    throw err;
                }
            }
        }
    }
}

async function serializeSlateToJson(slateObject) {
    await uploadImages(slateObject);
    sanitizeText(slateObject);
    return JSON.stringify(slateObject);
}

export default serializeSlateToJson;

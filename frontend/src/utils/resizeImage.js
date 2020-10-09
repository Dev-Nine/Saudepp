export default async function resizeImage(image, size, fileName) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, size, size);
    return new Promise((resolve) => {
        canvas.toBlob(
            (blob) => {
                blob.name = fileName;
                blob.lastModifiedDate = new Date();
                resolve(blob);
            },
            'image/jpeg',
            1,
        );
    });
}

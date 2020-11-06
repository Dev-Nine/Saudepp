export default async function compressImage(image, ratio, fileName) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return new Promise((resolve) => {
        canvas.toBlob(
            (blob) => {
                blob.name = fileName;
                blob.lastModifiedDate = new Date();
                resolve(blob);
            },
            'image/jpeg',
            ratio,
        );
    });
}

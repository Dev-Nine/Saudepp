export default async function getCroppedImg(
    image,
    originalImg,
    crop,
    fileName,
) {
    const scaleX = originalImg.width / image.width;
    const scaleY = originalImg.height / image.height;
    const realCrop = {
        width: crop.width * scaleX,
        height: crop.height * scaleY,
        x: crop.x * scaleX,
        y: crop.y * scaleY,
    };
    const canvas = document.createElement('canvas');
    canvas.width = realCrop.width;
    canvas.height = realCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        originalImg,
        realCrop.x,
        realCrop.y,
        realCrop.width,
        realCrop.height,
        0,
        0,
        realCrop.width,
        realCrop.height,
    );

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

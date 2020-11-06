import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import Modal from 'react-modal';
import { FormStyle } from './style';
import getCroppedImage from '../../utils/getCroppedImage';
import resizeImage from '../../utils/resizeImage';

const NoticeBannerChangeModal = ({
    setFinalImage,
    isModalOpen,
    setIsModalOpen,
    imageUrl,
}) => {
    const [crop, setCrop] = useState();
    const [finalCrop, setFinalCrop] = useState(null);

    const imgRef = useRef(null);
    const originalImgRef = useRef(null);

    const [previewImage, setPreviewImage] = useState(null);

    const onImageCropLoad = (cropImage) => {
        setCrop({
            aspect: 16 / 5,
            width: 30,
            unit: '%',
            x: 0,
            y: 0,
        });
        const originalImage = new Image();
        originalImage.src = imageUrl;
        imgRef.current = cropImage;
        originalImgRef.current = originalImage;
        return false;
    };

    const cancelImage = () => {
        setPreviewImage(null);
        setIsModalOpen(false);
    };

    const saveImage = () => {
        setFinalImage(previewImage);
        cancelImage();
    };

    useEffect(() => {
        if (finalCrop && imgRef.current) {
            getCroppedImage(
                imgRef.current,
                originalImgRef.current,
                finalCrop,
                'banner',
            ).then((img) => {
                const resizedImage = new Image();
                resizedImage.src = URL.createObjectURL(img);
                resizedImage.onload = () => {
                    if (resizedImage.height > 600) {
                        resizeImage(resizedImage, 600, 'banner_preview').then(
                            (resized) => {
                                setPreviewImage(resized);
                            },
                        );
                    } else {
                        setPreviewImage(img);
                    }
                };
            });
        }
    }, [finalCrop]);

    return (
        <Modal
            isOpen={isModalOpen}
            className="modal"
            onRequestClose={cancelImage}
        >
            <Form>
                <FormStyle>
                    <div className="banner-selection">
                        {previewImage ? (
                            <div className="preview">
                                <h3>Prévia</h3>
                                <img
                                    src={URL.createObjectURL(previewImage)}
                                    alt="Preview"
                                />
                            </div>
                        ) : null}
                        <div>
                            <ReactCrop
                                className="crop"
                                src={imageUrl}
                                crop={crop}
                                onImageLoaded={onImageCropLoad}
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setFinalCrop(c)}
                            />
                        </div>
                    </div>
                    <button type="button" onClick={saveImage}>
                        Salvar
                    </button>
                    <button
                        type="button"
                        className="alert"
                        onClick={cancelImage}
                    >
                        Cancelar
                    </button>
                </FormStyle>
            </Form>
        </Modal>
    );
};

export default NoticeBannerChangeModal;

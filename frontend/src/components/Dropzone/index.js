import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container } from './styles';

const Dropzone = ({ setFile, callback }) => {
    const onDrop = useCallback(
        (files) => {
            const file = files[0];
            setFile(file);
            if (callback) callback();
        },
        [callback, setFile],
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        multiple: false,
    });
    return (
        <Container {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Solte a foto!</p>
            ) : (
                <p>Selecione ou arraste a foto aqui</p>
            )}
        </Container>
    );
};

export default Dropzone;

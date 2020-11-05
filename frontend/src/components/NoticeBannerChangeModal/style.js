import styled from 'styled-components';

export const FormStyle = styled.div`
    border-radius: 20px;
    background: #f4f4f4;
    max-width: 600px;
    width: 80vw;
    padding: 25px;
    text-align: center;

    button {
        flex: 1;
        width: 100%;
        padding: 16px;
        border-radius: 5px;
        background: var(--main-basic-color);
        font-weight: bold;
        margin-top: 16px;
        border: 0;
        color: #fff;
        transition: filter 0.4s;

        &:hover {
            filter: brightness(90%);
        }
    }

    button.alert {
        background: var(--main-alert-color);
    }

    button.noborder {
        margin-top: 0;
        background: none;
        padding: 8px;
        color: var(--main-ref-color);
    }

    h1,
    h3 {
        margin-bottom: 8px;
    }

    .banner-selection {
        img {
            max-height: 240px;
        }
        .preview img {
            max-height: 160px;
            max-width: 100%;
            margin-bottom: 8px;
        }
        .crop,
        .preview img {
            border: 2px solid var(--main-light-color);
        }

        @media only screen and (max-width: 1099px) {
            flex-direction: column;
            flex-grow: 0;
        }
    }
`;

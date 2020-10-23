import styled from 'styled-components';

export const FormStyle = styled.div`
    border-radius: 20px;
    background: #f4f4f4;
    max-width: 480px;
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

    .avatar-selection {
        display: flex;
        gap: 8px;
        justify-content: space-around;
        width: 100%;

        :first-child {
            align-self: center;
        }

        img {
            max-height: 280px;
        }
        .crop,
        .preview img {
            border: 2px solid var(--main-light-color);
        }
        .preview img {
            border-radius: 50%;
            height: 200px;
        }
        @media only screen and (max-width: 1099px) {
            flex-direction: column;
            flex-grow: 0;
        }
    }
`;

import styled from 'styled-components';
import { shade } from 'polished';

export const ModalForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    button.close {
        display: flex;
        align-items: center;
        position: absolute;
        background: none;
        top: 24px;
        right: 24px;
    }

    h3 {
        color: var(--main-text-color);
    }

    form {
        border-radius: 20px;
        background: #f4f4f4;
        width: 100%;
        max-width: 400px;
        padding: 24px;
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

        h1 {
            margin-bottom: 16px;
        }

        a {
            text-decoration: none;
            text-align: left;
            display: block;
            color: #77c6ff;
            font-weight: 500;
            margin-top: 10px;
            transition: color 0.4s;
        }

        > a {
            margin-top: 10px;
            margin-bottom: 20px;
        }

        a:hover {
            color: ${shade(0.1, '#77C6FF')};
        }
    }
`;

export const ModalChangeAvatar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    button.close {
        display: flex;
        align-items: center;
        position: absolute;
        background: none;
        top: 24px;
        right: 24px;
    }

    h3 {
        color: var(--main-text-color);
    }

    form {
        border-radius: 20px;
        background: #f4f4f4;
        width: 100%;
        max-width: 800px;
        padding: 24px;
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

        h1 {
            margin-bottom: 16px;
        }

        a {
            text-decoration: none;
            text-align: left;
            display: block;
            color: #77c6ff;
            font-weight: 500;
            margin-top: 10px;
            transition: color 0.4s;
        }

        > a {
            margin-top: 10px;
            margin-bottom: 20px;
        }

        a:hover {
            color: ${shade(0.1, '#77C6FF')};
        }

        .avatar-selection {
            display: flex;
            gap: 8px;
            justify-content: space-around;
        }

        .avatar-selection:first-child {
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
    }

    @media only screen and (max-width: 1099px) {
        .avatar-selection {
            flex-direction: column;
            flex-grow: 0;
        }
    }
`;

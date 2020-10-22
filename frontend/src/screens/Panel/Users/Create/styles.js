import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    display: flex;
    margin: 24px;
    justify-content: center;
    align-items: center;
    padding: 10px;

    h3 {
        color: var(--main-text-color);
    }

    form {
        border-radius: 20px;
        background: #f4f4f4;
        width: 500px;
        max-width: 650px;
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

        h1 {
            margin-bottom: 15px;
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

        .avatar img {
            border: 2px solid var(--main-light-color);
            border-radius: 50%;
            height: 160px;
        }

        .avatar-change {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
    }
`;

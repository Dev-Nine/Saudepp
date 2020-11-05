import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    margin: 24px;
    justify-content: center;
    align-items: center;
    padding: 8px;

    .content {
        width: 100%;
        max-width: 720px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content form {
        background: #f4f4f4;
        width: 100%;
        padding: 16px;
        align-items: center;
        border-radius: 8px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .content form p {
        font-size: 20px;
        color: var(--main-text-color);
    }

    .content form input {
        display: block;
        height: 40px;
        width: 100%;
        margin-bottom: 20px;
        border-radius: 8px;
        border: 1px;
        padding: 0 10px;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .button-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        flex-wrap: wrap;
        margin-top: 10px;
    }

    .button1 button {
        margin-right: 20px;
        width: 145px;
        height: 37px;
        border: 1px;
        border-radius: 8px;
        background: #77c6ff;
        color: #ffffff;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0px 4px 1px #6fa9d3;
        transition: filter 0.2s;
    }

    .button1 button:hover {
        filter: brightness(90%);
    }

    .button2 button {
        width: 145px;
        height: 37px;
        border: 1px;
        border-radius: 8px;
        background: #77c6ff;
        color: #ffffff;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0px 4px 1px #6fa9d3;
        transition: filter 0.2s;
    }

    .button2 button:hover {
        filter: brightness(90%);
    }

    button.disabled {
        filter: brightness(85%);
        box-shadow: inset 0px 4px 1px #6fa9d3;
        :hover {
            filter: brightness(85%);
            cursor: default;
        }
    }

    @media only screen and (max-width: 1099px) {
        .content {
            width: 100%;
            max-width: 1000px;
        }

        .content form {
            width: 100%;
            max-width: 800px;
        }

        .button-container {
            display: flex;
            align-items: center;
        }
        .button1 button {
            display: block;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }
        .button2 button {
            display: block;
        }
    }
`;

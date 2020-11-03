import styled from 'styled-components';

export const EditorContainer = styled.div`
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    list-style-position: inside;
    background-color: white;
    border-radius: 0 0 8px 8px;

    img:hover {
        cursor: pointer;
    }
`;

export const ToolBar = styled.div`
    background: white;
    border-radius: 8px 8px 0 0;
    padding: 8px;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: 2px solid var(--main-lighter-color);
`;

export const ButtonStyle = styled.button`
    height: 28px;
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0;
    border: ${(props) =>
        props.active
            ? '1px solid black'
            : '1px solid var(--main-lighter-color)'};
    color: ${(props) => (props.active ? 'black' : 'var(--main-lighter-color)')};
    margin-right: 8px;
    :last-child {
        margin-right: 0;
    }
`;

import styled from 'styled-components';

export const Container = styled.div`
    :hover {
        cursor: pointer;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    height: 100px;
    border: 2px dashed var(--main-light-color);
    padding: 16px;
`;

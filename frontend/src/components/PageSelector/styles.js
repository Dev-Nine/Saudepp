import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    svg {
        cursor: pointer;
    }

    input {
        width: 56px;
        margin: 0 8px 0 8px;
    }

    @media only screen and (max-width: 1099px) {
        justify-content: center;
    }
`;

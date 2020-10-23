import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    margin: 24px;
    justify-content: center;
    align-items: center;
    padding: 8px;

    form {
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

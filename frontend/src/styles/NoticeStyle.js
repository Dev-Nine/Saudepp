import styled from 'styled-components';

export const NoticeContainer = styled.div`
    padding: 16px 40px;
    display: flex;
    flex-direction: column;

    img {
        max-height: 400px;
        max-width: 100%;
        margin: 0 0 24px 0;
        align-self: center;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: #303030;
        margin-bottom: 10px;
    }

    li {
        margin-bottom: 10px;
    }

    p,
    li {
        font-size: 18px;
        color: #303030;
    }

    @media only screen and (max-width: 1099px) {
        padding: 16px 20px;
    }
`;

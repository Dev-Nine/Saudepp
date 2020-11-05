import styled from 'styled-components';
import { shade } from 'polished';

export const Search = styled.div`
    font-family: Roboto;
    font-style: normal;

    select {
        display: block;
        width: 30%;
        height: 40px;
        border-style: hidden;
        border-radius: 10px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

        font-size: 15px;
        line-height: 28px;
        background-color: #ffffff;
    }

    option {
        font-size: 15px;
        line-height: 28px;
        background-color: #ffffff;
    }

    @media (max-width: 1099px) {
        select {
            width: 100%;
        }
    }
`;

export const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    grid-gap: 8px;
`;

export const TagButton = styled.button`
    margin-top: 8px;
    padding: 8px 14px;
    background: #0094de;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    transition: 1s;

    &:hover {
        background: ${shade(0.1, '#0094de')};
    }

    span {
        color: #fff;
        padding-right: 4px;
        font-size: 16px;
        font-weight: 500;
    }
`;

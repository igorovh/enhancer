import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick, children }) => {
    return <Btn onClick={onClick}>{children}</Btn>;
};

export default Button;

const Btn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 50px;
    transition: 0.2s;
    width: 100%;

    &:hover {
        background: rgba(255, 255, 255, 0.15);
    }
`;

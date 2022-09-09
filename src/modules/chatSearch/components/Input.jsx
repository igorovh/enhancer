import React from 'react';
import styled from 'styled-components';

const Input = ({ label }) => {
    return (
        <Wrapper>
            <Label>{label}</Label>
            <Inpt />
        </Wrapper>
    );
};

export default Input;

const Wrapper = styled.div``;

const Inpt = styled.input`
    height: 40px;
    width: 100%;
    border-radius: 4px;
    background-color: #141414;
    outline: none;
    -webkit-appearance: none;
    border: none;
    padding: 2rem;
    color: white;
`;

const Label = styled.p`
    padding-bottom: 0.5rem;
    font-size: 1.2rem;
`;

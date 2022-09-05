import React from 'react';
import styled from 'styled-components';

const Checkbox = ({ id }) => {
    return (
        <Wrapper>
            <Input type="checkbox" id={id} />
            <Label htmlFor={id}>Toggle</Label>
        </Wrapper>
    );
};

export default Checkbox;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    & input {
        display: none;
    }
`;

const Input = styled.input``;

const Label = styled.label`
    cursor: pointer;
    text-indent: -9999px;
    width: 50px;
    height: 25px;
    background: grey;
    display: block;
    border-radius: 100px;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 21px;
        height: 21px;
        background: #fff;
        border-radius: 90px;
        transition: 0.3s;
    }

    ${Input}:checked + & {
        background: var(--purple-color);
        &::after {
            left: calc(100%);
            transform: translateX(calc(-100% - 2px));
        }
    }
`;

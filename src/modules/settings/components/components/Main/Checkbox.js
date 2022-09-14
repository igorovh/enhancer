import React, { useRef } from 'react';
import styled from 'styled-components';
import * as Settings from '$Settings';

const Checkbox = ({ id, name }) => {
    const input = useRef();

    const handleChange = () => {
        Settings.set(name, input.current.checked);
        // settings = JSON.parse(localStorage.getItem('_enhancer_settings'));
        // localStorage.setItem(
        //     '_enhancer_settings',
        //     JSON.stringify({ ...settings, [name]: { enabled: input.current.checked } })
        // );
    };

    return (
        <Wrapper>
            <Input onChange={handleChange} ref={input} type="checkbox" id={id} defaultChecked={Settings.get(name)} />
            <Label htmlFor={id}></Label>
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
    width: 45px;
    height: 25px;
    background: var(--te-black);
    border: 2px solid var(--te-gray-color-dark);
    display: block;
    border-radius: 100px;
    position: relative;
    transition: 0.1s;

    &::before {
        border-width: 0px 0px 2px 2px;
        border-style: solid;
        border-color: var(--color-text-toggle-checked-icon);
        display: block;
        position: absolute;
        top: 0.9rem;
        left: 1.1rem;
        width: 0.7rem;
        height: 0.3rem;
        transform: translate3d(-50%, -50%, 0px) rotate(-45deg);
        content: '';
    }

    &::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 15px;
        height: 15px;
        background: var(--te-gray-color-light);
        border-radius: 90px;
        transition: 0.3s;
    }

    &:hover {
        border: 2px solid var(--te-gray-color-light);
    }

    ${Input}:checked + & {
        border-color: var(--te-purple-color-light);
        &::after {
            left: calc(100% - 18px);
            background: var(--te-purple-color-light);
        }
    }
`;

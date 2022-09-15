import React, { useRef } from 'react';
import styled from 'styled-components';
import * as Settings from '$Settings';

const Radio = ({ id, name, options }) => {
    const inputs = useRef([]);

    let currentOption = Settings.get(name);

    const handleChange = () => {
        const input = inputs.current.filter((input) => input.checked)[0];
        if (!input) return;
        currentOption = input.id.substring(input.id.lastIndexOf('-') + 1, input.id.length);
        Settings.set(name, currentOption);
    };

    return (
        <Wrapper>
            {options &&
                options.map((option, i) => {
                    return (
                        <React.Fragment key={i}>
                            <Input
                                checked={currentOption === option.id}
                                onChange={handleChange}
                                ref={(element) => (inputs.current[i] = element)}
                                type="radio"
                                name={id}
                                id={`${id}-${option.id}`}
                            />
                            <Label htmlFor={`${id}-${option.id}`}>
                                <span>{option.title}</span>
                            </Label>
                        </React.Fragment>
                    );
                })}
        </Wrapper>
    );
};

export default Radio;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;
const Input = styled.input`
    display: none;
`;

const Label = styled.label`
    background: var(--te-bg-color-light);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1.4rem;
    ${Input}:checked + & {
        color: var(--te-bg-color-light);
        background: var(--te-purple-color);
    }
`;

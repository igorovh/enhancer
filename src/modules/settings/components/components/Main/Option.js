import React from 'react';
import styled from 'styled-components';
import Checkbox from './Checkbox';
import Radio from './Radio';

const Option = ({ title, name, description, id, type, options }) => {
    return (
        <Wrapper>
            <NameWrapper>
                <Name>{title}</Name>
                {description && <Description>{description}</Description>}
            </NameWrapper>
            {type === 'checkbox' && <Checkbox id={id} name={name} />}
            {type === 'radio' && <Radio id={id} name={name} options={options} />}
        </Wrapper>
    );
};

export default Option;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.2rem;
    color: white;
    background-color: var(--te-bg-color-dark);
    border-radius: 0.4rem;
`;

const NameWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.div`
    color: var(--te-gray-color-light);
    font-size: 1.75rem;
`;

const Description = styled.div`
    color: var(--te-gray-color-dark);
    font-size: 1.2rem;
`;

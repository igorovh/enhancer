import React from 'react';
import styled from 'styled-components';
import Checkbox from './Checkbox';
import Radio from './Radio';

const Option = ({ name, description, id, type, options }) => {
    return (
        <Wrapper>
            <NameWrapper>
                <Name>{name}</Name>
                {description && <Description>{description}</Description>}
            </NameWrapper>
            {type === 'checkbox' && <Checkbox id={id} />}
            {type === 'radio' && <Radio id={id} options={options} />}
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
`;

const NameWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.div`
    color: var(--te-purple-color);
    font-size: 1.75rem;
    font-weight: bold;
`;

const Description = styled.div`
    color: var(--te-gray-color-light);
    font-size: 1.2rem;
`;

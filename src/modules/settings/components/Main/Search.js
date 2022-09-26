import React from 'react';
import styled from 'styled-components';

const Search = () => {
    return (
        <Wrapper>
            <Input placeholder="Search..." />
            <Border />
        </Wrapper>
    );
};

export default Search;

const Wrapper = styled.div`
    position: relative;
`;
const Input = styled.input`
    background-color: var(--te-bg-color-light);
    border: none;
    color: white;
    padding: 10px;
    width: 200px;

    &:focus {
        outline: none;
    }
`;
const Border = styled.span`
    width: 0;
    position: absolute;
    bottom: 0;
    height: 2px;
    background-color: var(--te-purple-color);
    transition: 0.3s;
    left: 50%;
    ${Input}:focus + &, ${Input}:not(:placeholder-shown) + & {
        left: 0;
        width: 220px;
    }
`;

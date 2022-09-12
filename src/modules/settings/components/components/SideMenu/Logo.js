import React from 'react';
import styled from 'styled-components';

const LogoIcon = () => {
    return (
        <Wrapper>
            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="47.5" fill="white" stroke="black" strokeWidth="5"/>
                <circle cx="50.5" cy="57.5" r="22.5" fill="#6441A5"/>
                <circle cx="50.5" cy="57.5" r="10.5" fill="black"/>
                <circle cx="59" cy="49" r="6" fill="white"/>
            </svg>
        </Wrapper>
    );
};

export default LogoIcon;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 100%;
`;

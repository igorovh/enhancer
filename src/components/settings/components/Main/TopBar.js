import React from 'react';
import styled from 'styled-components';
// import Search from './Search';
import { RiCloseFill } from 'react-icons/ri';
import { hide } from '../../../../common/settings';

const TopBar = () => {
    return (
        <Wrapper>
            {/* <Search /> */}
            <CloseButton onClick={hide} className="te-close-button">
                <RiCloseFill
                    className="te-close-button-icon"
                    style={{
                        width: '25px',
                        height: '25px',
                        fill: 'var(--te-gray-color-light)',
                        transition: '0.2s',
                    }}
                />
            </CloseButton>
        </Wrapper>
    );
};

export default TopBar;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: var(--te-bg-color-dark);
    min-height: 60px;
    padding: 0 2rem;
    gap: 0.5rem;
`;

const CloseButton = styled.button`
    height: 25px;
    background: none;
    border: none;
    cursor: pointer;
`;

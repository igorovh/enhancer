import React from 'react';
import styled from 'styled-components';
import Input from './Input';

const Search = () => {
    return (
        <>
            <Wrapper>
                <Header>
                    <Logo>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 20 20"
                            fill="var(--purple-color)">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M14.25 11.8195C14.25 13.8522 12.6022 15.5 10.5694 15.5C8.53673 15.5 6.88889 13.8522 6.88889 11.8195C6.88889 9.78674 8.53673 8.1389 10.5694 8.1389C12.6022 8.1389 14.25 9.78674 14.25 11.8195ZM10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"></path>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.386 11.4317C12.2943 11.4581 12.1974 11.4722 12.0972 11.4722C11.5219 11.4722 11.0556 11.0059 11.0556 10.4306C11.0556 10.3303 11.0697 10.2334 11.0961 10.1417C10.9501 10.1036 10.7969 10.0833 10.6389 10.0833C9.6417 10.0833 8.83333 10.8917 8.83333 11.8889C8.83333 12.8861 9.6417 13.6944 10.6389 13.6944C11.6361 13.6944 12.4444 12.8861 12.4444 11.8889C12.4444 11.7309 12.4242 11.5777 12.386 11.4317Z"></path>
                        </svg>
                    </Logo>
                </Header>
                <Content>
                    <Input label={'Username starts with'} />
                    <Input label={'Message includes'} />
                </Content>
            </Wrapper>
            <Bg />
        </>
    );
};

export default Search;

const Wrapper = styled.div`
    width: 600px;
    border-radius: 6px;
    overflow: hidden;
    background-color: #1c1c1c;
    z-index: 999;
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    svg {
        fill: #a970e1;
    }
`;

const Content = styled.div`
    padding: 2rem;
`;

const Header = styled.div`
    height: 50px;
    background-color: #141414;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
`;

const Bg = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;
